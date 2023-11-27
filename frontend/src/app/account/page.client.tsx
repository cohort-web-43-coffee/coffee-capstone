'use client'
import {CardBody, CardImage, SmallCard} from "@/app/components/Card";
import {Session} from "@/utils/fetchSession";
import {useEffect, useState} from "react";
import {requestGetHeaders} from "@/app/utils/fetch";
import Link from 'next/link'


type BookmarkCardProps = {
    shop: Shop
}


type BookmarkListProps = {
    session?: Session
}
type Shop = {
    shopId: string,
    shopAddress: string
    shopName: string
    shopPhoneNumber: string,
    shopUrl: string
    shopPhotoUrl: string
}

export function BookmarkList ({session}: BookmarkListProps) {
    const [shops, setShops] = useState(new Array<Shop>())
    console.log(shops)
    const effect = () => {
        const getRequestHeaders = requestGetHeaders(session)
        fetch('/apis/bookmark', getRequestHeaders)
            .then(response => response.json())
            .then((body) => setShops(body.data))
    }

    useEffect(effect, [setShops, session])

    return (
        <div
            className={'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-12 md:gap-x-12 justify-items-center'}>
            {shops.map((shop: Shop) => <BookmarkCard key={shop.shopId} shop={shop}/>)}
        </div>
    )
}

function BookmarkCard ({shop}: BookmarkCardProps) {
    return (
        <Link key={shop.shopId} href={`/shop/${shop.shopId}`}>
            <SmallCard>
                <CardImage imageUrl={shop.shopPhotoUrl} imageAlt={shop.shopName}/>
                <CardBody>
                    <div className={"flex text-xs sm:text-sm md:text-sm"}>
                        <ul>
                            <li className={"container p-1 sm:p-1 md:p-2 lg:p-2 text-lg font-bold"}>{shop.shopName}</li>
                        </ul>
                    </div>
                </CardBody>
            </SmallCard>
        </Link>
    )
}