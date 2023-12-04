import type { Metadata } from 'next'
import './globals.css'
import {Footer} from '@/app/components/Footer'
import {ChildProps} from '@/types/Props'
import {NavBar} from '@/app/components/NavBar'
import {getSession} from '@/utils/fetchSession'


export const metadata: Metadata = {
    title: 'Valid Coffee',
    description: 'A coffee website by coffee people for coffee people who like coffee!',
}

type RootLayoutProps = ChildProps & {
    searchParams: {
        q: string,
        tags: string
    }
}

export default async function RootLayout ({children, searchParams}: Readonly<RootLayoutProps>) {
    const session = await getSession()
    return (
        <html data-theme={'valid'} lang={'en'}>
        <body>
        <NavBar query={searchParams?.q ?? 'none'} session={session}/>
        {children}
        <Footer/>
        </body>
        </html>
    )
}