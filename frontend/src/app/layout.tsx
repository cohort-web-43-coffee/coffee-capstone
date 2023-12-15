import type { Metadata } from 'next'
import './globals.css'
import {ChildProps} from '@/types/Props'
import React from 'react'
import Link from 'next/link'
import {YelpSVG} from '@/components/SVG'


export const metadata: Metadata = {
    title: 'Valid Coffee',
    description: 'A coffee website by coffee people for coffee people who like coffee!',
}

type RootLayoutProps = ChildProps & {
    navbar: React.ReactNode
    modal: React.ReactNode
}

export default async function RootLayout ({children, navbar, modal}: Readonly<RootLayoutProps>) {
    return (
        <html data-theme={'valid'} lang={'en'}>
        <body>
        {navbar}
        {children}
        <Footer/>
        {modal}
        </body>
        </html>
    )
}

function Footer () {
    return (
        <footer className='footer items-center p-4 text-neutral-content'>
            <aside className='items-center grid-flow-col'>
                <Link href={'/about'} className={'text-lg link'}>About Us</Link> | <Link href={'https://github.com/cohort-web-43-coffee/coffee-capstone'} className={'text-lg link'}> Source Code</Link>
            </aside>
            <nav className='flex md:place-self-center md:justify-self-end'>
                Data powered by <Link href={'https://yelp.com'} className={'inline'}><YelpSVG/></Link>
            </nav>
        </footer>
    )
}