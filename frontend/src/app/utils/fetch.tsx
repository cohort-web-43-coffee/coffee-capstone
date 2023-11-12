export async function getRestData (endpoint: string) {
    const url = getUrl(endpoint)
    const response = await fetch(url, requestGetHeaders)
    return (await response.json()).data
}

export async function postRestData (endpoint: string, body: string) {
    const url = getUrl(endpoint)
    const postHeaders = requestPostHeaders(body)
    const response = await fetch(url, postHeaders)
    return (await response.json()).data
}

function getUrl(endpoint: string): string {
    return `${process.env.REST_API_URL}${endpoint}`
}

const requestGetHeaders: RequestInit = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        "Content-Type":
            'application/json'
    }
}

export function requestPostHeaders (body: string): RequestInit {
    return {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type":
                'application/json'
        },
        body
    }
}