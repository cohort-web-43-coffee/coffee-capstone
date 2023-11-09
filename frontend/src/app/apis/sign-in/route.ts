
import Cookies from "js-cookie";
import {NextResponse, } from "next/server";
import {unstable_cache} from "next/cache";

export async function POST(request: Request) {
    const data = await request.json()

    const response : Response = await fetch(`${process.env.REST_API_URL}/apis/sign-in`,
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

    const clientResponse = NextResponse.json({work: "jc sake"})

    const serverCookies = responseFromServer.headers.get("Set-Cookies")

    if (serverCookies) {
        clientResponse.headers.set("Set-Cookies", serverCookies)
    }

    let jwtToken = responseFromServer.headers.get("Authorization")

    if (jwtToken) {
        clientResponse.cookies.set("jwt-token", jwtToken, {maxAge: 3 * 60 * 60 *1000, httpOnly: true})
    }

    return clientResponse

}