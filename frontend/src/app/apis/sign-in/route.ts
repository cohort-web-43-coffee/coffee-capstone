import {processEnv} from "@next/env";

export async function POST(request: Request) {
    const data = await request.json()
    console.log(data)

    const response : Response = await fetch(`${process.env.REST_API_URL}/apis/sign-in`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
        )
    console.log(response)
    const result = await response.json()
    result.status === 200 ? result.type = "alert-success" : result.type = "alert alert-danger"
    return Response.json(result)
}