import {MenuButton, SearchField, SignOutButton, SiteTitle} from '@/app/layout/NavBar.client'
import Link from 'next/link'
import Image from 'next/image'
import {SignInModal, SignInModalButton, SignUpModal, SignUpModalButton} from '@/app/layout/SignUpModal'
import {SessionProps} from '@/app/types/Props'
import {getRestData} from '@/app/utils/fetch'
import {clearSession} from '@/utils/fetchSession'

type NavBarProps = SessionProps & {
    query: string
}

export async function NavBar ({session, query}: NavBarProps) {
    const searchResult = await getRestData(`/apis/shop/search?name=${query}`)

    return <nav className={'navbar'}>
        <div className={'dropdown'}>
            <MenuButton/>
            <ul className={'menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-32 gap-1'}>
                <MenuContent session={session}/>
            </ul>
        </div>
        <div className={'flex-1'}>
            <SiteTitle/>
        </div>
        <div className={'flex-none'}>
            Search:&nbsp;
            <div className={'dropdown'}>
                <div className={'form-control'}>
                    <SearchField initialText={query}/>
                    <div tabIndex={0}>
                        <ul tabIndex={0}
                            className={'dropdown-content z-10 menu grid p-2 shadow bg-base-100 rounded-box sm:w-40 md:w-52 max-h-52 overflow-y-auto gap-4'}>
                            {searchResult.length > 0 ? searchResult.map((shop: any) =>
                                    <Link key={shop.shopId} href={`/shop/${shop.shopId}`}>
                                        <li>{shop.shopName}</li>
                                    </Link>) :
                                <p>No Results</p>}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={'navbar-center hidden md:flex'}>
                <ul className={'relative flex items-center px-1 gap-4'}>
                    <MenuContent session={session}/>
                </ul>
            </div>
        </div>
        <SignUpModal/>
        <SignInModal/>
    </nav>
}

function MenuContent ({session}: Readonly<SessionProps>) {
    return (session ?
            <>
                <li className={'w-auto inline'}><BookmarkLink/></li>
                <li className={'w-auto inline'}><SignOutButton session={session} onSuccess={clearSession}/></li>
            </>
            :
            <>
                <li className={'w-auto inline'}><SignUpModalButton/></li>
                <li className={'w-auto inline'}><SignInModalButton/></li>
            </>
    )
}

function BookmarkLink () {
    return (
        <Link href={'/account'}>
            <div className={'avatar placeholder pt-2'}>
                <div className={'rounded-lg w-5 h-5'}>
                    <Image src={'/bookmark.png'} alt={'bookmark icon'} width={48} height={48}/>
                </div>
            </div>
        </Link>
    )
}