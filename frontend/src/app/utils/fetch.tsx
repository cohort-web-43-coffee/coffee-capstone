import {Session} from '@/utils/fetchSession'

export async function getRestData (endpoint: string) {
    const url = getUrl(endpoint)
    const response = await fetch(url, requestGetHeaders)
    return (await response.json()).data
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

function getUrl(endpoint: string): string {
    return `${process.env.REST_API_URL}${endpoint}`
}

const jsonHeaders = {
    Accept: 'application/json',
    "Content-Type":
        'application/json'
}

const requestGetHeaders: RequestInit = {
    method: 'GET',
    headers: jsonHeaders
}

export function requestPostHeaders (body: string, session?: Session): RequestInit {
    if(session) {
        return {
            method: 'POST',
            headers: {
                ...jsonHeaders,
                'Authorization': `${session.authorization}`
            },
            body
        }
    }
    else {
        return {
            method: 'POST',
            headers: jsonHeaders,
            body
        }
    }
}
export function requestDeleteHeaders (body: string, session?: Session): RequestInit {
    if(session) {
        return {
            method: 'DELETE',
            headers: {
                ...jsonHeaders,
                'Authorization': `Bearer ${session.authorization}`
            },
            body
        }
    }
    else {
        return {
            method: 'DELETE',
            headers: jsonHeaders,
            body
        }
    }
}