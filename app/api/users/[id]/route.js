import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/UserModel';

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const user = await User.findById(params.id);
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function PATCH(req, { params }) {
    try {
        await dbConnect();
        const updates = await req.json();

        const user = await User.findByIdAndUpdate(
            params.id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}