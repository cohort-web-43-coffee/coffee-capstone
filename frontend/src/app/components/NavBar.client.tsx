'use client'
import Link from 'next/link';
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {SessionProps} from "@/types/Props"
import {requestGetHeaders} from '@/utils/fetchHeaders'
import React from 'react'


export function SiteTitle () {
    return <header className={'text-2xl'}><Link href={'/'}>Valid Coffee</Link></header>
}

export function SearchField () {
    const router = useRouter()
    const pathName = usePathname()
    const currentParams = useSearchParams()


    const handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newParams = new URLSearchParams(currentParams)
        newParams.set('q', event.target.value)
        router.push(`${pathName}?${newParams}`)
    }
    return (
            <input type={'text'} placeholder={'Coffee shop name'}
                   className={'placeholder:italic input input-bordered w-40 md:w-auto'} defaultValue={currentParams.get('q') ?? ''}
                   onChange={handleTextChanged}/>
    )
}
type SignOutButtonProps = SessionProps & {
    onSuccess: () => Promise<void>
}
export function SignOutButton ({session, onSuccess}: SignOutButtonProps) {
    const headers = requestGetHeaders(session)
    return (
        <button
            onClick={() => fetch('/apis/sign-out', headers)
                .then(response => {
                    if (response.ok) {
                        onSuccess().then()
                    }
                })
            }
            className={'btn btn-primary btn-xs rounded-full mt-2'}>
            Sign Out
        </button>
    )
}

export function MenuButton () {
    return (
        <label tabIndex={0} className={"btn btn-ghost md:hidden"}>
            <svg xmlns={'http://www.w3.org/2000/svg'} className={'h-5 w-5'} fill={'none'} viewBox={'0 0 24 24'}
                 stroke={'currentColor'}>
                <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}
                      d={'M4 6h16M4 12h8m-8 6h16'}/>
            </svg>
        </label>
    )
}