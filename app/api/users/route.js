import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/UserModel';
import StayData from '../../../models/stayDataModel';
import FlightData from '../../../models/flightDataModel';
import commentModel from '../../../models/commentModel';

export async function GET(request) {
    try {
        await dbConnect();
        const usersStay = await StayData.find({}).populate('user').sort({ createdAt: -1 });
        const usersFlight = await FlightData.find({}).populate('user').sort({ createdAt: -1 });
        return NextResponse.json({ usersStay, usersFlight });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const { userData, stayData, flightData } = await request.json();

        const user = await User.findOneAndUpdate(
            { email: userData.email },
            {
                fullName: userData.fullName,
                phone: userData.phone,
                email: userData.email
            },
            { upsert: true, new: true }
        );

        let bookingResponse = {
            userId: user._id,
            stayBooking: null,
            flightBooking: null
        };

        if (stayData) {
            const stay = await StayData.create({
                user: user._id,
                ...stayData,
                checkIn: new Date(stayData.checkIn),
                checkOut: new Date(stayData.checkOut)
            });

            const comment = await commentModel.create({
                requestId: stay._id,
                onModel: 'StayData',
                content: ' '
            });

            stay.comment = comment._id;
            await stay.save();
            await User.findByIdAndUpdate(user._id, { $push: { stayBookings: stay._id } });
            bookingResponse.stayBooking = stay._id;
        }
        if (flightData) {

            const flight = await FlightData.create({
                user: user._id,
                ...flightData,
                departDate: new Date(flightData.departDate),
                returnDate: flightData.returnDate ? new Date(flightData.returnDate) : null
            });

            const comment = await commentModel.create({
                requestId: flight._id,
                onModel: 'FlightData',
                content: ' '
            });

            flight.comment = comment._id;
            await flight.save();
            await User.findByIdAndUpdate(user._id, { $push: { flightBookings: flight._id } });
            bookingResponse.flightBooking = flight._id;
        }
        return NextResponse.json({
            success: true,
            message: 'Booking created successfully',
            data: bookingResponse
        }, { status: 201 });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to create booking'
        }, { status: 500 });
    }
}