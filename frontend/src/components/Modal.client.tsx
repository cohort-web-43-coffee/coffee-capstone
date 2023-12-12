'use client'
import {useRouter} from 'next/navigation'


export function CloseModalButton() {
    const router = useRouter()
    return <button className={'btn btn-sm btn-circle btn-ghost absolute right-2 top-2'} onClick={() => router.back()}>X</button>
}