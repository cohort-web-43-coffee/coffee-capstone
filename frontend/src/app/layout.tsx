import type { Metadata } from 'next'
import './globals.css'
import {Footer} from '@/app/layout/Footer'


export const metadata: Metadata = {
    title: 'Valid Coffee',
    description: 'A coffee website by coffee people for coffee people who like coffee!',
}

type RootLayoutProps = {
    children: React.ReactNode
}

export default function RootLayout(props : RootLayoutProps) {
    const { children } = props
    return (
        <html data-theme={'valid'} lang={'en'}>
        <body>
        {children}
        <Footer/>
        </body>
        </html>
    )
}