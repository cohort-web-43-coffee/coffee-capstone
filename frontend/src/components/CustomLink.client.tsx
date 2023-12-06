'use client'
import {ChildProps, HrefProps} from '@/types/Props'
import {useRouter} from 'next/navigation'

// This exists to get around 'Cannot update a component from inside the function body of a different component' errors
export function CustomLink ({children, href}: ChildProps & HrefProps) {
    const router = useRouter()

    const handleClick = (event: any) => {
        event.preventDefault()
        router.push(href)
    }

    return (
        <a href={href} onClick={handleClick} className={'inline-grid'}>{children}</a>
    )
}