import {cookies} from 'next/headers';
import {jwtDecode} from 'jwt-decode';
import { unstable_noStore as noStore } from 'next/cache';
import {Account, AccountSchema} from '@/utils/models/Account';

noStore()
export type Session = {
    account: Account,
    authorization: string
    exp: number
}

let session : Session|undefined = undefined
const currentTimeInSeconds = new Date().getTime() / 1000

export async function getSession(): Promise<Session|undefined > {
    const cookieStore = cookies()
    const jwtToken = cookieStore.get('jwt-token')
    if (session === undefined && jwtToken) {
        setJwtToken(jwtToken.value)
        return session
    } else {
        return session
    }
}

export async function clearSession() {
    'use server'
    cookies().delete('jwt-token')
    session = undefined
}

function setJwtToken(jwtToken: string) {
    try {
        const parsedJwtToken = jwtDecode(jwtToken) as any
        console.log('Token is expired', currentTimeInSeconds > parsedJwtToken.exp)

        if(parsedJwtToken &&  currentTimeInSeconds < parsedJwtToken.exp) {
            session = {
                account: AccountSchema.parse(parsedJwtToken.auth),
                authorization: jwtToken,
                exp: parsedJwtToken.exp
            }
        } else {
            session = undefined
        }
    } catch (error) {
        session = undefined
    }
}