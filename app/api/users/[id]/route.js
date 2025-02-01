import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/UserModel'
import Comment from '../../../../models/commentModel'
import StayData from '../../../../models/stayDataModel'
import FlightData from '../../../../models/flightDataModel'

export async function GET(request, { params }) {
    try {
        await dbConnect()
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type')

        if (type === 'stay') {
            const stayData = await StayData.findById(params.id)
                .populate('user')
                .populate({
                    path: 'comments',
                    model: Comment,
                    options: { sort: { createdAt: -1 } }
                })
            return NextResponse.json({ data: stayData })
        } else if (type === 'flight') {
            const flightData = await FlightData.findById(params.id)
                .populate('user')
                .populate({
                    path: 'comments',
                    model: Comment,
                    options: { sort: { createdAt: -1 } }
                })
            return NextResponse.json({ data: flightData })
        }
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    try {
        await dbConnect()
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type')
        const updates = await request.json()

        const ModelToUpdate = type === 'stay' ? StayData : FlightData

        if (updates.comment) {
            const newComment = await Comment.create({
                requestId: params.id,
                content: updates.comment,
                author: updates.author || 'Admin',
                onModel: type === 'stay' ? 'StayData' : 'FlightData'
            })
            await ModelToUpdate.findByIdAndUpdate(params.id,
                { $push: { comments: newComment._id } }
            )
        }

        if (updates.user) {
            const booking = await ModelToUpdate.findById(params.id)
            await User.findByIdAndUpdate(booking.user, updates.user)
        }

        if (updates.booking) {
            await ModelToUpdate.findByIdAndUpdate(params.id, updates.booking)
        }

        const updatedData = await ModelToUpdate.findById(params.id)
            .populate('user')
            .populate({
                path: 'comments',
                model: Comment,
                options: { sort: { createdAt: -1 } }
            })

        return NextResponse.json({ data: updatedData })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}