import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export async function PATCH(req) {
    try {
        await dbConnect();
        const { id, isDone } = await req.json();
        const user = await User.findByIdAndUpdate(id, { isDone }, { new: true });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}