import {ChildProps, ImageProps} from '@/app/types/Props'
import React from "react"
import {Card, CardBody, CardImage} from "@/app/components/Card"
import Link from "next/link"


type SlideProps = {
    slideId: string,
    nextSlideId: string,
    previousSlideId: string,
    shopArray: Array<object>
}

type CarouselNavProps = {
    previousSlideId: string,
    nextSlideId: string
}

type ShopCardProps = ImageProps & {
    shopName: string
    shopAddress: string
}

export function Carousel(props: ChildProps) {
    return (<div className={"carousel w-full"}>
        {props.children}
    </div>)
}

export function CarouselSlide({slideId, nextSlideId, previousSlideId, shopArray}: SlideProps) {
    return (
        <div id={slideId}
             className={'carousel-item relative w-full grid gap-4 sm:gap-4 md:gap-4 lg:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 md:grid-rows-2 justify-items-center'}>
            {shopArray.map(async (shop: any) => {
                return <Link  key={shop.shopId} href={`/shop/${shop.shopId}`}><ShopCard imageUrl={shop?.shopPhotoUrl} imageAlt={shop.shopName}
                                                                                        shopName={shop.shopName} shopAddress={shop.shopAddress}/></Link>
            })}
            <CarouselNav previousSlideId={previousSlideId} nextSlideId={nextSlideId}/>
        </div>
    )
}

function CarouselNav({previousSlideId, nextSlideId}: CarouselNavProps) {
    return (
        <nav className={"absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"}>
            <a href={`#${previousSlideId}`} className={"btn btn-circle"}>❮</a>
            <a href={`#${nextSlideId}`} className={"btn btn-circle"}>❯</a>
        </nav>
    )
}

function ShopCard({imageUrl, imageAlt, shopName, shopAddress}: ShopCardProps) {
    return (
        <Card>
            <CardImage imageUrl={imageUrl} imageAlt={imageAlt}/>
            <CardBody>
                <div className={'my-1'}>
                    <h1 className={'text-lg font-bold'}>{shopName}</h1>
                    <p className={'text-base'}>{shopAddress}</p>
                </div>
            </CardBody>
        </Card>
    )
}