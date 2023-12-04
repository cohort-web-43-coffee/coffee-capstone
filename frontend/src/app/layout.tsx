import type { Metadata } from 'next'
import './globals.css'
import {Footer} from '@/app/layout/Footer'
import {ChildProps, SearchProps} from '@/app/types/Props'
import {NavBar} from '@/app/layout/NavBar'
import {getSession} from '@/utils/fetchSession'


export const metadata: Metadata = {
    title: 'Valid Coffee',
    description: 'A coffee website by coffee people for coffee people who like coffee!',
}

type RootLayoutProps = ChildProps & SearchProps

export default async function RootLayout ({children, searchParams}: Readonly<RootLayoutProps>) {
    const session = await getSession()
    return (
        <html data-theme={'valid'} lang={'en'}>
        <body>
        <NavBar query={searchParams?.q ?? ''} session={session}/>
        {children}
        <Footer/>
        </body>
        </html>
    )
}