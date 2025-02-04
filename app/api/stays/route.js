import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function POST(request) {
    try {
        const body = await request.json()
        const { userId, databaseId, ...stayData } = body

        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                Status: {
                    status: { name: "Active" }
                },
                Destination: {
                    title: [{
                        text: { content: stayData.destination || '' }
                    }]
                },
                "Departure City": {
                    rich_text: [{
                        text: { content: stayData.from || '' }
                    }]
                },
                "Check-in": {
                    date: { start: stayData.checkIn }
                },
                "Check-out": {
                    date: { start: stayData.checkOut }
                },
                Nights: {
                    number: parseInt(stayData.nights) || 0
                },
                Adult: {
                    number: parseInt(stayData.adults) || 0
                },
                Children: {
                    number: parseInt(stayData.children) || 0
                },
                Hotel: {
                    rich_text: [{
                        text: { content: stayData.hotel || '' }
                    }]
                },
                Client: {
                    relation: [{ id: userId }]
                }
            }
        })

        return NextResponse.json({ data: response })
    } catch (error) {
        console.error('Notion API Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}