import Link from 'next/link';
import {SignUpModalButton, SignUpModal, SignInModalButton, SignInModal} from '@/app/layout/SignUpModal'


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
            <SignInModal/>
        </nav>
    )
}

function SiteTitle () {
    return <header className={'text-2xl'}>Valid Coffee</header>
}

function SearchField () {
    return (
        <div className={'form-control'}>
            <input type={'text'} placeholder={'Coffee shop name'} className={'input input-bordered w-40 md:w-auto'}/>
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
            <li>
                <SignInModalButton/>
            </li>
        </>
    )
}