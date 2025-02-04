import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = "19080eea390f81acb599c76e955d8874";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, phone } = body;

        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                "Client Name": {
                    title: [
                        {
                            text: { content: name }
                        }
                    ]
                },
                "Email": {
                    email: email
                },
                "Phone Number": {
                    phone_number: phone
                }
            }
        });

        return new Response(
            JSON.stringify({ message: "Client added successfully", response }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Error adding client", error: error.message }),
            { status: 500 }
        );
    }
}
