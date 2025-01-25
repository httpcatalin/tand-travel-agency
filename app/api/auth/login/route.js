import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Admin from '../../../../models/AdminModel';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        await dbConnect();
        const { username, password } = await req.json();

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return NextResponse.json({
                success: false,
                error: 'Invalid credentials'
            }, { status: 401 });
        }

        // Debug logging
        console.log('Input password:', password);
        console.log('Stored hash:', admin.password);

        // Ensure password and hash are strings
        const cleanPassword = String(password);
        const cleanHash = String(admin.password);

        try {
            const isMatch = await bcrypt.compare(cleanPassword, cleanHash);
            console.log('Password match result:', isMatch);

            if (!isMatch) {
                return NextResponse.json({
                    success: false,
                    error: 'Invalid credentials'
                }, { status: 401 });
            }

            return NextResponse.json({
                success: true,
                username: admin.username
            });
        } catch (bcryptError) {
            console.error('Bcrypt error:', bcryptError);
            return NextResponse.json({
                success: false,
                error: 'Authentication error'
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            success: false,
            error: 'Server error'
        }, { status: 500 });
    }
}