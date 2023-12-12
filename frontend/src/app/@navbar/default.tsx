import {SearchField, SignOutButton} from '@/app/@navbar/default.client'
import Link from 'next/link'
import {SessionProps} from '@/types/Props'
import {getRestData} from '@/utils/fetchHeaders'
import {clearSession, getSession} from '@/utils/fetchSession'
import React from 'react'
import {CustomLink} from '@/components/CustomLink.client'
import {BookmarksSVG, MenuSVG} from '@/components/SVG'


type NavBarProps = {
    searchParams: {
        q: string
    }
}

type SearchBarProps = {
    searchResult: any[]
}

export default async function NavBar ({searchParams}: Readonly<NavBarProps>) {
    const session = await getSession()
    const searchResult = await getRestData(`/apis/shop/search?name=${searchParams.q}`)

    return <nav className={'navbar'}>
        <Menu session={session}/>
        <div className={'flex-1'}>
            <header className={'text-2xl'}><Link href={'/'}>Valid Coffee</Link></header>
        </div>
        <div className={'flex-none'}>
            Search:&nbsp;<SearchBar searchResult={searchResult}/>
            <div className={'navbar-center hidden md:flex'}>
                <ul className={'relative flex items-center px-1 gap-4'}>
                    <MenuContent session={session}/>
                </ul>
            </div>
        </div>
    </nav>
}

function Menu ({session}: Readonly<SessionProps>) {
    return (
        <div className={'dropdown'}>
            <label tabIndex={0} className={'btn btn-ghost md:hidden'}>
                <MenuSVG/>
            </label>
            <ul className={'menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-32 gap-1'}>
                <MenuContent session={session}/>
            </ul>
        </div>
    )
}

function MenuContent ({session}: Readonly<SessionProps>) {
    return (session ?
            <>
                <li className={'w-auto inline'}><BookmarkLink/></li>
                <li className={'w-auto inline'}><SignOutButton session={session} onSuccess={clearSession}/></li>
            </>
            :
            <>
                <li className={'w-auto inline'}><CustomLink href={'/sign-up'}><button className={'btn btn-xs btn-primary rounded-full mt-2'}>Sign Up</button></CustomLink></li>
                <li className={'w-auto inline'}><CustomLink href={'/sign-in'}><button className={'btn btn-xs btn-primary rounded-full mt-2'}>Sign In</button></CustomLink></li>
            </>
    )
}

function BookmarkLink () {
    return (
        <Link href={'/account'}>
            <div className={'avatar placeholder pt-2'}>
                <div className={'rounded-lg w-5 h-5'}>
                    <BookmarksSVG className={'fill-primary'}/>
                </div>
            </div>
        </Link>
    )
}

function SearchBar ({searchResult}: Readonly<SearchBarProps>) {
    return (
        <div className={'dropdown'}>
            <div className={'form-control'}>
                <SearchField/>
                <SearchResults searchResult={searchResult}/>
            </div>
        </div>
    )
}

function SearchResults ({searchResult}: Readonly<SearchBarProps>) {
    return (
        <div tabIndex={0}>
            <ul tabIndex={0}
                className={'dropdown-content z-10 menu grid p-2 shadow bg-base-100 rounded-box sm:w-40 md:w-52 max-h-52 overflow-y-auto'}>
                {searchResult.length > 0 ? searchResult.map((shop: any) =>
                        <Link key={shop.shopId} href={`/shop/${shop.shopId}`}>
                            <li>{shop.shopName}</li>
                            <li className={'text-xs pt-1'} key={shop.shopId}>{shop.shopAddress}</li>
                            <div className={'divider max-h-1'}></div>
                        </Link>)
                    :
                    <p>No Results</p>}
            </ul>
        </div>
    )
}