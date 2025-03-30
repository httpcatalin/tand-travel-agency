import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function PUT(req, { params }) {
    try {
        if (!params || !params.id) {
            return NextResponse.json({ 
                success: false, 
                error: "Missing route parameter: id" 
            }, { status: 400 });
        }
        
        const { id } = params;
        
        let flightRequests, hotelRequests;
        try {
            const body = await req.json();
            flightRequests = body.flightRequests || [];
            hotelRequests = body.hotelRequests || [];
        } catch (parseError) {
            return NextResponse.json({ 
                success: false, 
                error: "Invalid request body: " + parseError.message 
            }, { status: 400 });
        }

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
        console.error('Error updating Notion page:', error);
        return NextResponse.json({ 
            success: false, 
            error: error.message || "Internal server error" 
        }, { status: 500 });
    }
}