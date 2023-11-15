'use client'
import Link from 'next/link';
import {SignInModalButton, SignUpModalButton} from '@/app/layout/SignUpModal'
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {ChildProps, SessionProps} from "@/app/types/Props"
import Image from "next/image";

type SearchFieldProps = ChildProps & {
    initialText: string
}

export function SiteTitle() {
    return <header className={'text-2xl'}><Link href={'/'}>Valid Coffee</Link></header>
}

export async function SearchField({children, initialText}: SearchFieldProps) {
    const router = useRouter()
    const pathName = usePathname()
    const currentParams = useSearchParams()
    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newParams = new URLSearchParams(currentParams)
        newParams.set('q', event.target.value)
        router.push(`${pathName}?${newParams}`)
    }
    return (
        <div className={'form-control'}>
            <input type={'text'} placeholder={'Coffee shop name'}
                   className={'placeholder:italic input input-bordered w-40 md:w-auto'} value={initialText}
                   onChange={handleSearchTextChange}/>
            {children}
        </div>
    )
}

export function MenuButton() {
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

export function MenuContent({session}: SessionProps) {
    return (
        <>
            {session ?
                <li className={'w-auto inline'}><Link href={'/account'}>
                    <div className={"avatar placeholder pt-2"}>
                    <div className={"rounded-lg w-5 h-5"}>
                        <img className={''} src={'./bookmark_icon.png'} alt={'bookmark icon'}/>
                    </div>
                </div>
                </Link></li>
                : <>
                    <li className={'w-auto inline'}><SignUpModalButton/></li>
                    <li className={'w-auto inline'}><SignInModalButton/></li>
                </>
            }
        </>
    )
}