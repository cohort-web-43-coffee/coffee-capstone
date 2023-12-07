'use client'
import {ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams} from "next/navigation"
import {SessionProps} from "@/types/Props"
import {requestGetHeaders} from '@/utils/fetchHeaders'
import React from 'react'
import {Session} from '@/utils/fetchSession'


type SignOutButtonProps = SessionProps & {
    onSuccess: () => Promise<void>
}

export function SearchField () {
    const searchParams = useSearchParams()
    const handler = makeTextChangeHandler(searchParams)

    return (
        <input
            type={'text'}
            placeholder={'Coffee shop name'}
            className={'placeholder:italic input input-bordered w-40 md:w-auto'}
            defaultValue={searchParams.get('q') ?? ''}
            onChange={handler}/>
    )
}

export function SignOutButton ({session, onSuccess}: SignOutButtonProps) {
    const handler = makeSignOutClickHandler(session, onSuccess)

    return (
        <button onClick={handler} className={'btn btn-primary btn-xs rounded-full mt-2'}>Sign Out</button>
    )
}

function makeTextChangeHandler (searchParams: ReadonlyURLSearchParams) {
    const router = useRouter()
    const pathName = usePathname()

    return (event: React.ChangeEvent<HTMLInputElement>) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('q', event.target.value)
        router.replace(`${pathName}?${newParams}`, {scroll: false})
        router.refresh()
    }
}

function makeSignOutClickHandler (session: Session | undefined, onSuccess: () => Promise<void>) {
    const headers = requestGetHeaders(session)

    return () => fetch('/apis/sign-out', headers)
        .then(response => {
                if (response.ok) {
                    onSuccess().then()
                }
            }
        )
}