import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const { flightRequests, hotelRequests } = await req.json();

        const response = await notion.pages.update({
            page_id: id,
            properties: {
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