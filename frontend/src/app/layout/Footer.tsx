import Link from 'next/link'

export function Footer () {
    return (
        <footer className={"footer footer-center p-4 text-base-content"}>
            <aside>
                <Link href={'/about'}><p className={'text-lg link'}>About Us</p></Link>
                <p>Copyright © 2023 - All rights reserved by Valid Coffee Developers</p>
            </aside>
        </footer>
    )
}