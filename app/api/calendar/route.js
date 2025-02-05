import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function POST(request) {
    try {
        const { userId, databaseId, name, date, flightRequests, hotelRequests, from, to } = await request.json();



        let departureEvent = null;
        let returnEvent = null;

        if (flightRequests && flightRequests.length > 0) {
            departureEvent = await notion.pages.create({
                parent: { database_id: databaseId },
                properties: {
                    "Name": {
                        title: [{
                            text: { content: `Departure of ${name} to ${to}` }
                        }]
                    },
                    "Date": {
                        date: { start: date }
                    },
                    "Flight Requests": {
                        relation: flightRequests.map(id => ({ id }))
                    },
                    "Hotel Requests": {
                        relation: hotelRequests.map(id => ({ id }))
                    },
                    "Client": {
                        relation: [{ id: userId }]
                    }
                }
            })

            returnEvent = await notion.pages.create({
                parent: { database_id: databaseId },
                properties: {
                    "Name": {
                        title: [{
                            text: { content: `Arrival of ${name} from ${from}` }
                        }]
                    },
                    "Date": {
                        date: { start: date }
                    },
                    "Flight Requests": {
                        relation: flightRequests.map(id => ({ id }))
                    },
                    "Hotel Requests": {
                        relation: hotelRequests.map(id => ({ id }))
                    },
                    "Client": {
                        relation: [{ id: userId }]
                    }
                }
            })
        }

        if (hotelRequests && hotelRequests.length > 0) {
            departureEvent = await notion.pages.create({
                parent: { database_id: databaseId },
                properties: {
                    "Name": {
                        title: [{
                            text: { content: `Hotel for ${name} at ${to}` }
                        }]
                    },
                    "Date": {
                        date: { start: date }
                    },
                    "Flight Requests": {
                        relation: flightRequests.map(id => ({ id }))
                    },
                    "Hotel Requests": {
                        relation: hotelRequests.map(id => ({ id }))
                    },
                    "Client": {
                        relation: [{ id: userId }]
                    }
                }
            })
        }

        return NextResponse.json({
            data: {
                departure: departureEvent,
                return: returnEvent
            }
        })

    } catch (error) {
        console.error('Calendar error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}