'use client'

import Image from 'next/image'

type ShopListCardProps = {
    imageUrl: string,
    alt: string
}

export function ShopListCard (props: ShopListCardProps) {
    const {imageUrl, alt} = props
    return (
        <figure className="mx-10 h-60 w-60">
            <img src={imageUrl} alt={alt} className="rounded-2xl"/>
        </figure>
    )
}