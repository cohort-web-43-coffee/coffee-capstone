'use client'
import {Card, CardBody, CardImage} from "@/components/Card";
import {Session} from "@/utils/fetchSession";
import {useEffect, useState} from "react";
import {requestGetHeaders} from "@/utils/fetchHeaders";
import Link from 'next/link'
import {SessionProps} from '@/types/Props'


type BookmarkCardProps = {
    shop: Shop
}

type Shop = {
    shopId: string,
    shopAddress: string
    shopName: string
    shopPhoneNumber: string,
    shopUrl: string
    shopPhotoUrl: string
}

export function BookmarkList ({session}: Readonly<SessionProps>) {
    const [shops, setShops] = useState(new Array<Shop>())

    const effect = () => {
        const getRequestHeaders = requestGetHeaders(session)
        fetch('/apis/bookmark', getRequestHeaders)
            .then(response => response.json())
            .then((body) => setShops(body.data))
    }

    useEffect(effect, [setShops, session])

    return (
        <div
            className={'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'}>
            {shops.map((shop: Shop) => <BookmarkCard key={shop.shopId} shop={shop}/>)}
        </div>
    )
}

function BookmarkCard ({shop}: Readonly<BookmarkCardProps>) {
    return (
        <Link key={shop.shopId} href={`/shop/${shop.shopId}`}>
            <Card>
                <CardImage imageUrl={shop.shopPhotoUrl} imageAlt={shop.shopName}/>
                <CardBody>
                    <div className={"flex text-xs sm:text-sm md:text-sm"}>
                        <ul>
                            <li className={"container p-1 sm:p-1 md:p-2 lg:p-2 text-lg font-bold"}>{shop.shopName}</li>
                        </ul>
                    </div>
                </CardBody>
            </Card>
        </Link>
    )
}