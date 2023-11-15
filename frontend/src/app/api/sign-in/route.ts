import {NextResponse, } from "next/server";
import {cookies} from "next/headers";

export async function POST(request: Request){


    const data = await request.json()

    const responseFromServer =  await fetch(`${process.env.PUBLIC_API_URL}/apis/sign-in`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
    )

    const response = responseFromServer.clone()

    const authorization = response.headers.get("authorization")

    if (authorization) {
        const cookieStore = cookies()
        const cookie = cookieStore.set("jwt-token", authorization, {path: "/", maxAge:3600})
        console.log(cookie)
    }

    return response
}