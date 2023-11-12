'use client'
import Link from 'next/link';
import {SignInModalButton, SignUpModalButton} from '@/app/layout/SignUpModal'
import {useRouter} from "next/navigation"
import {ChildProps} from "@/app/types/Props"

type SearchFieldProps = ChildProps & {
    initialText: string
}


export function SiteTitle() {
    return <header className={'text-2xl'}>Valid Coffee</header>
}

export async function SearchField({children, initialText}: SearchFieldProps) {
    const router = useRouter()
    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        router.push(`/?q=${event.target.value}`)
    }
    return (
        <div className={'form-control'}>
            <input type={'text'} placeholder={'Coffee shop name'} className={'placeholder:italic input input-bordered w-40 md:w-auto'} value={initialText}
                   onChange={handleSearchTextChange}/>
            {children}
        </div>
    )
}

export function MenuButton() {
    return (
        <label tabIndex={0} className="btn btn-ghost md:hidden">
            <svg xmlns={'http://www.w3.org/2000/svg'} className={'h-5 w-5'} fill={'none'} viewBox={'0 0 24 24'}
                 stroke={'currentColor'}>
                <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}
                      d={'M4 6h16M4 12h8m-8 6h16'}/>
            </svg>
        </label>
    )
}

export function MenuContent() {
    return (
        <>
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href={'/account'}>Account</Link></li>
            <li><Link href={'/about'}>About Us</Link></li>
            <li>
                <SignUpModalButton/>
            </li>
            <li>
                <SignInModalButton/>
            </li>
        </>
    )
}