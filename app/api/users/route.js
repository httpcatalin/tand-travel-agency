import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/UserModel';
import StayData from '../../../models/stayDataModel';
import FlightData from '../../../models/flightDataModel';

export async function GET() {
    try {
        await dbConnect();
        const stayData = await StayData.find({}).sort({ createdAt: -1 });
        let users = [];
        for (let i = 0; i < stayData.length; i++) {
            let user = await User.findById(stayData[i].user);
            users.push(user);
        }
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function POST(request) {
    try {
        await dbConnect();

        const { userData, stayData, flightData } = await request.json();

        // Create or find user
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

        // Handle stay booking
        if (stayData) {
            const stay = await StayData.create({
                user: user._id,
                ...stayData,
                checkIn: new Date(stayData.checkIn),
                checkOut: new Date(stayData.checkOut)
            });

            await User.findByIdAndUpdate(
                user._id,
                { $push: { stayBookings: stay._id } }
            );

            bookingResponse.stayBooking = stay._id;
        }

        // Handle flight booking
        if (flightData) {
            const flight = await FlightData.create({
                user: user._id,
                ...flightData,
                departDate: new Date(flightData.departDate),
                returnDate: flightData.returnDate ? new Date(flightData.returnDate) : null
            });

            await User.findByIdAndUpdate(
                user._id,
                { $push: { flightBookings: flight._id } }
            );

            bookingResponse.flightBooking = flight._id;
        }

        return Response.json({
            success: true,
            message: 'Booking created successfully',
            data: bookingResponse
        }, { status: 201 });

    } catch (error) {
        console.error('Booking error:', error);
        return Response.json({
            success: false,
            message: error.message || 'Failed to create booking'
        }, { status: 500 });
    }
}