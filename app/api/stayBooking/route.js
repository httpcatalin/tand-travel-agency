import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/UserModel'
import Comment from '../../../models/commentModel'
import StayData from '../../../models/stayDataModel'

export async function GET(request, { params }) {
    try {
        await dbConnect()
        const stayData = await StayData.findById(params.id)
            .populate('user')
            .populate({ path: 'comments', model: Comment, options: { sort: { createdAt: -1 } } })
        return NextResponse.json({ data: stayData })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PATCH(request, { params }) {
    try {
        await dbConnect()
        const updates = await request.json()
        let updatedUser = null
        let updatedBooking = null

        if (updates.comment) {
            const newComment = await Comment.create({
                requestId: params.id,
                content: updates.comment,
                author: updates.author || 'Admin'
            })
            await StayData.findByIdAndUpdate(params.id, { $push: { comments: newComment._id } })
        }

        if (updates.user) {
            updatedUser = await User.findByIdAndUpdate(params.id, updates.user, { new: true, runValidators: true })
            if (!updatedUser) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 })
            }
        }

        if (updates.booking) {
            updatedBooking = await StayData.findByIdAndUpdate(
                params.id,
                updates.booking,
                { new: true, runValidators: true }
            ).populate('user').populate({
                path: 'comments',
                model: Comment,
                options: { sort: { createdAt: -1 } }
            })
        }

        return NextResponse.json({ user: updatedUser, booking: updatedBooking })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}