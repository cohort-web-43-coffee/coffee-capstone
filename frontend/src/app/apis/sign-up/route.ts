

import {NextResponse, } from "next/server";

export async function POST(request: Request) {

    const data = await request.json()

    const responseFromServer = await fetch(`${process.env.REST_API_URL}/apis/sign-in`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
        )
const result = await responseFromServer.json()

    result.status === 200 ? result.type = "alert alert-success" : result.type = "alert alert-danger"

    const clientResponse = NextResponse.json({work: "result"})

}