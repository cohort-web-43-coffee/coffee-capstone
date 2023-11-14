import {Session} from '@/utils/fetchSession'

export async function getRestData (endpoint: string, session?: Session) {
    const url = getUrl(endpoint)
    const getHeaders = requestGetHeaders(session)

    const response = await fetch(url, getHeaders)
    const json = await response.json()
    return json.data
}

export async function postRestData (endpoint: string, body: string, session?: Session) {
    const url = getUrl(endpoint)
    const postHeaders = requestPostHeaders(body, session)
    const response = await fetch(url, postHeaders)
    return (await response.json()).data
}

export async function deleteRestData (endpoint: string, body: string, session?: Session) {
    const url = getUrl(endpoint)
    const postHeaders = requestDeleteHeaders(body, session)
    const response = await fetch(url, postHeaders)
    return (await response.json()).data
}

function getUrl (endpoint: string): string {
    console.log('publicApi:', process.env.PUBLIC_API_URL)
    return `${process.env.PUBLIC_API_URL}${endpoint}`
}

const jsonHeaders = {
    Accept: 'application/json',
    "Content-Type":
        'application/json'
}

export function requestGetHeaders (session?: Session): RequestInit {
    if (session) {
        return {
            method: 'GET',
            credentials: 'include',
            headers: {
                ...jsonHeaders,
                'Authorization': `${session.authorization}`,
            }
        }
    } else {
        return {
            method: 'GET',
            headers: jsonHeaders
        }
    }
}

export function requestPostHeaders (body: string, session?: Session): RequestInit {
    if (session) {
        return {
            method: 'POST',
            headers: {
                ...jsonHeaders,
                'Authorization': session.authorization
            },
            body
        }
    } else {
        return {
            method: 'POST',
            headers: jsonHeaders,
            body
        }
    }
}

export function requestDeleteHeaders (body: string, session?: Session): RequestInit {
    if (session) {
        return {
            method: 'DELETE',
            headers: {
                ...jsonHeaders,
                'Authorization': session.authorization
            },
            body
        }
    } else {
        return {
            method: 'DELETE',
            headers: jsonHeaders,
            body
        }
    }
}