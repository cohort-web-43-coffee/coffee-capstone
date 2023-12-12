import {Session} from '@/utils/fetchSession'


const jsonHeaders = {
    Accept: 'application/json',
    "Content-Type":
        'application/json'
}

export async function getRestData (endpoint: string, session?: Session) {
    const url = getUrl(endpoint)
    const getHeaders = requestGetHeaders(session)
    const response = await fetch(url, getHeaders)
    const json = await response.json()
    return json.data
}

export async function postRestData (endpoint: string, body: object, session?: Session) {
    const url = getUrl(endpoint)
    const postHeaders = requestPostHeaders(body, session)
    const response = await fetch(url, postHeaders)
    return (await response.json()).data
}

export async function deleteRestData (endpoint: string, body: object, session?: Session) {
    const url = getUrl(endpoint)
    const postHeaders = requestDeleteHeaders(body, session)
    const response = await fetch(url, postHeaders)
    return (await response.json()).data
}


export function requestGetHeaders (session?: Session): RequestInit {
    if (session) {
        return {
            method: 'GET',
            credentials: 'include',
            headers: {
                ...jsonHeaders,
                'Authorization': `${session.authorization}`
            }
        }
    } else {
        return {
            method: 'GET',
            headers: jsonHeaders
        }
    }
}

export function requestPostHeaders (body: object, session?: Session): RequestInit {
    if (session) {
        return {
            method: 'POST',
            headers: {
                ...jsonHeaders,
                'Authorization': session.authorization
            },
            body: JSON.stringify(body)
        }
    } else {
        return {
            method: 'POST',
            headers: jsonHeaders,
            body: JSON.stringify(body)
        }
    }
}

export function requestDeleteHeaders (body: object, session?: Session): RequestInit {
    if (session) {
        return {
            method: 'DELETE',
            headers: {
                ...jsonHeaders,
                'Authorization': session.authorization
            },
            body: JSON.stringify(body)
        }
    } else {
        return {
            method: 'DELETE',
            headers: jsonHeaders,
            body: JSON.stringify(body)
        }
    }
}

function getUrl (endpoint: string): string {
    return `${process.env.PUBLIC_API_URL}${endpoint}`
}