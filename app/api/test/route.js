import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const databaseId = "19080eea390f81acb599c76e955d8874";

export async function POST(req) {
    try {
        const { name, email, phone, status, flightRequests, hotelRequests } = await req.json();

        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                "Client Name": {
                    title: [{ text: { content: name } }]
                },
                "Email": {
                    email: email
                },
                "Phone Number": {
                    phone_number: phone
                },
                "Flight Requests": {
                    relation: flightRequests.map(id => ({ id }))
                },
                "Hotel Requests": {
                    relation: hotelRequests.map(id => ({ id }))
                }
            }
        });

        return NextResponse.json({ success: true, data: response });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
        });

        return NextResponse.json({ success: true, data: response.results });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}