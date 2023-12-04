'use client'
import Link from 'next/link';
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {SessionProps} from "@/app/types/Props"
import {requestGetHeaders} from '@/app/utils/fetch'

type SearchFieldProps = {
    initialText: string
}

export function SiteTitle () {
    return <header className={'text-2xl'}><Link href={'/'}>Valid Coffee</Link></header>
}

export function SearchField ({initialText}: Readonly<SearchFieldProps>) {
    const router = useRouter()
    const pathName = usePathname()
    const currentParams = useSearchParams()
    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newParams = new URLSearchParams(currentParams)
        newParams.set('q', event.target.value)
        router.push(`${pathName}?${newParams}`)
    }
    return (
            <input type={'text'} placeholder={'Coffee shop name'}
                   className={'placeholder:italic input input-bordered w-40 md:w-auto'} value={initialText}
                   onChange={handleSearchTextChange}/>
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