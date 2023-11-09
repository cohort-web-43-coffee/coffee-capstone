'use client'

import Link from 'next/link';
import {SignUpModalButton, SignUpModal} from '@/app/layout/SignUpModal'
import {useRouter} from "next/navigation";

export function NavBar () {
    return (
        <nav className={'navbar'}>
            <div className={'dropdown'}>
                <MenuButton/>
                <ul className={'menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-32'}>
                    <MenuContent/>
                </ul>
            </div>
            <div className={'flex-1'}>
                <SiteTitle/>
            </div>
            <div className={'flex-none'}>
                Search:&nbsp;
                <SearchField/>
                <div className={'navbar-center hidden md:flex'}>
                    <ul className={'menu menu-horizontal px-1'}>
                        <MenuContent/>
                    </ul>
                </div>
            </div>
            <SignUpModal/>
        </nav>
    )
}

function SiteTitle () {
    return <header className={'text-2xl'}>Valid Coffee</header>
}

async function SearchField () {
    const router = useRouter()
    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        router.push(`/?search=${event.target.value}`)
    }
    return (
        <div className={'form-control'}>
            <input type={'text'} placeholder={'Coffee shop name'} className={'input input-bordered w-40 md:w-auto'} onChange={
                handleSearchTextChange
            }/>
        </div>
    )
}



function MenuButton () {
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

function MenuContent () {
    return (
        <>
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href={'/account'}>Account</Link></li>
            <li><Link href={'/shop'}>Shops</Link></li>
            <li><Link href={'/about'}>About Us</Link></li>
            <li>
                <SignUpModalButton/>
            </li>
        </>
    )
}