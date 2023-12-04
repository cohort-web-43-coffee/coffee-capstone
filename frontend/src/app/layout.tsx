import type { Metadata } from 'next'
import './globals.css'
import {ChildProps} from '@/types/Props'
import React from 'react'
import Link from 'next/link'


export const metadata: Metadata = {
    title: 'Valid Coffee',
    description: 'A coffee website by coffee people for coffee people who like coffee!',
}

type RootLayoutProps = ChildProps & {
    navbar: React.ReactNode
}

export default async function RootLayout ({children, navbar}: Readonly<RootLayoutProps>) {
    return (
        <html data-theme={'valid'} lang={'en'}>
        <body>
        {navbar}
        {children}
        <Footer/>
        </body>
        </html>
    )
}

function Footer () {
    return (
        <footer className={"footer footer-center p-4 text-base-content"}>
            <aside>
                <Link href={'/about'}><p className={'text-lg link'}>About Us</p></Link>
                <p>Copyright © 2023 - All rights reserved by Valid Coffee Developers</p>
            </aside>
        </footer>
    )
}