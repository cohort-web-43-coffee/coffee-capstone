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
    modal: React.ReactNode
}

export default async function RootLayout ({children, navbar, modal}: Readonly<RootLayoutProps>) {
    return (
        <html data-theme={'valid'} lang={'en'}>
        <body>
        {navbar}
        <Section>
            {children}
        </Section>
        <Footer/>
        {modal}
        </body>
        </html>
    )
}
function Section ({children}: Readonly<ChildProps>) {
    return (
        <section className={'bg-primary-container text-accent'}>
            <div className={'container mx-auto p-4 bg-primary-container-variant'}>
                {children}
            </div>
        </section>
    )
}


function Footer () {
    return (
        <footer className={'footer footer-center p-4 text-base-content'}>
            <aside>
                <Link href={'/about'}><p className={'text-lg link'}>About Us</p></Link>
            </aside>
        </footer>
    )
}