import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = "19080eea390f81acb599c76e955d8874";

export async function POST(req) {
    try {
        const { name, email, phone } = await req.json();

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
                }
            }
        });

        return Response.json(response);
    } catch (error) {
        console.error(error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}



export async function GET(req) {
    try {

        const response = await notion.databases.query({
            database_id: "19080eea390f81acb599c76e955d8874",
        });

        return new Response(
            JSON.stringify({ message: "Data fetched successfully", data: response.results }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Error fetching data", error: error.message }),
            { status: 500 }
        );
    }
}
