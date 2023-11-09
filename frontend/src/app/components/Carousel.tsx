import {ChildProps, ImageProps} from '@/app/types/Props'
import React from "react";
import {Card, CardBody, CardImage} from "@/app/components/Card";

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
    return (<div className="carousel w-full">
        {props.children}
    </div>)
}

export function CarouselSlide({slideId, nextSlideId, previousSlideId, shopArray}: SlideProps) {
    return (
        <div id={slideId} className={'carousel-item relative w-full flex justify-around gap-4'}>
            {shopArray.map(async (shop: any) => {
                const photoData = await getPhotoData(shop.shopId)
                return <ShopCard key={shop.shopId} imageUrl={photoData.data[0]?.photoUrl} imageAlt={shop.shopName}
                                 shopName={shop.shopName} shopAddress={shop.shopAddress}/>
            })}
            <CarouselNav previousSlideId={previousSlideId} nextSlideId={nextSlideId}/>
        </div>
    )
}

function CarouselNav({previousSlideId, nextSlideId}: CarouselNavProps) {
    return (
        <nav className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={`#${previousSlideId}`} className="btn btn-circle">❮</a>
            <a href={`#${nextSlideId}`} className="btn btn-circle">❯</a>
        </nav>
    )
}

function ShopCard({imageUrl, imageAlt, shopName, shopAddress}: ShopCardProps) {

    return (
        <Card>
            <a href={''}>
                <CardImage imageUrl={imageUrl} imageAlt={imageAlt}/>
                <CardBody>
                    <div className={'prose'}><h1>{shopName}</h1>
                    <p>{shopAddress}</p></div>
                </CardBody>
            </a>
        </Card>
    )
}

async function getPhotoData(shopId: string): Promise<any> {
    try {
        const requestData = getRequestData()
        const url = `${process.env.REST_API_URL}/photo/photoByShopId/${shopId}`
        const response = await fetch(url, requestData)
        const data = await response.json()
        return data
    } catch (error) {

    }
}

function getRequestData(): RequestInit {
    return {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type":
                'application/json'
        }
    }
}