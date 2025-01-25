import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/UserModel';

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find({});
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function POST(req) {
    try {
        await dbConnect();
        const userData = await req.json();
        console.log(userData);
        if (!userData.fullName || !userData.email || !userData.phone) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const user = await User.create({
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Server error occurred' },
            { status: 500 }
        );
    }
}