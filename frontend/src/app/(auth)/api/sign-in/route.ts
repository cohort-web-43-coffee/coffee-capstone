import {cookies} from 'next/headers';

export async function POST (request: Request) {
    const data = await request.json()
    const response = await postSignIn(data)
    const authorization = response.headers.get('authorization')

    if (authorization) {
        const cookieStore = cookies()
        cookieStore.set('jwt-token', authorization, {path: '/', maxAge: 3600})
    }

    return response
}

async function postSignIn (data: string) {
    return await fetch(`${process.env.PUBLIC_API_URL}/apis/sign-in`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
}