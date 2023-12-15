import {ChildProps} from '@/types/Props'

type ShopLayoutProps = ChildProps & {
    modal: React.ReactNode
}

export default function ShopLayout({modal, children} : ShopLayoutProps) {
    return (
        <>
            {children}
            {modal}
        </>
    )
}