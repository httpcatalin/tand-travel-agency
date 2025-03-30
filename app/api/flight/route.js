import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function POST(request) {
    try {
        const body = await request.json()
        const { userId, databaseId, ...flightData } = body


        const database = await notion.databases.retrieve({
            database_id: databaseId
        })

        console.log('Database schema:', database.properties)

        const properties = {

            "Arrival Airport": {
                title: [{
                    text: { content: flightData.to }
                }]
            },
            "Departure Airport": {
                rich_text: [{
                    text: { content: flightData.from }
                }]
            },
            "Arrival Airport Code": {
                rich_text: [{
                    text: { content: flightData.arrivalAirportCode }
                }]
            },
            "Depart Airport Code": {
                rich_text: [{
                    text: { content: flightData.departureAirportCode }
                }]
            },
            "Departure Date": {
                date: {
                    start: flightData.departDate
                }
            },
            ...(flightData.trip !== 'oneway' && {
                "Return Date": {
                    date: {
                        start: flightData.returnDate
                    }
                }
            }),
            "Trip": {
                select: {
                    name: flightData.trip === 'oneway' ? 'One Way' : 'Round Trip'
                }
            },
            "Class": {
                select: {
                    name: flightData.class.charAt(0).toUpperCase() + flightData.class.slice(1)
                }
            },
            "Adult": {
                number: parseInt(flightData.adult)
            },
            "Children": {
                number: parseInt(flightData.children)
            },
            "Client": {
                relation: [{ id: userId }]
            }
        }

        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties
        })

        return NextResponse.json({ data: response })
    } catch (error) {
        console.error('Flight booking error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}