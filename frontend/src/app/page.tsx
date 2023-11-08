'use client'

import {Card, CardBody, CardImage} from "@/app/components/Card";
import {PrimarySection} from '@/app/components/Section'
import {PrimaryContainer} from '@/app/components/Container'
import {TagList} from '@/app/components/Tag'
import {busyTags, customTags, drinkTags} from '@/app/mocks/tags'
import React from 'react'
import {Carousel, CarouselSlide} from '@/app/components/Carousel'
import {ImageProps} from '@/app/types/Props'

type ShopCardProps = ImageProps & {
    shopName: string
}

export default function HomePage () {
    return (
        <>
            <PrimarySection>
                <PrimaryContainer autoMargins>
                    <ShopList/>
                    <TagSection/>
                </PrimaryContainer>
            </PrimarySection>
        </>
    )
}

async function ShopList () {
    const allShopData = (await getShopData()).data
    const firstShopData = allShopData.splice(0,3)
    return (
        <div className="flex-row justify-center">
            <Carousel>
                <CarouselSlide slideId={'Weee1'} previousSlideId={'Weee3'} nextSlideId={'Weee2'}>
                    {firstShopData.map(async (shop: any) => {
                        const photoData = await getPhotoData(shop.shopId)
                        return <ShopCard key={shop.shopId} imageUrl={photoData.data[1].photoUrl} imageAlt={shop.shopName}
                                  shopName={shop.shopName}/>
                    })}

                </CarouselSlide>
                <CarouselSlide slideId={'Weee2'} previousSlideId={'Weee1'} nextSlideId={'Weee3'}>
                    <ShopCard shopName={'Bear Cafe 5'} imageUrl={'https://placebear.com/800/800'} imageAlt={'yeet'}/>
                    <ShopCard shopName={'Bear Cafe 7'} imageUrl={'https://placebear.com/800/800'} imageAlt={'yeet'}/>
                    <ShopCard shopName={'Bear Cafe 3'} imageUrl={'https://placebear.com/800/800'} imageAlt={'yeet'}/>
                </CarouselSlide>
                <CarouselSlide slideId={'Weee3'} previousSlideId={'Weee2'} nextSlideId={'Weee1'}>
                    <ShopCard shopName={'Bear Cafe 2'} imageUrl={'https://placebear.com/700/700'} imageAlt={'yeet'}/>
                    <ShopCard shopName={'Bear Cafe 1'} imageUrl={'https://placebear.com/700/700'} imageAlt={'yeet'}/>
                    <ShopCard shopName={'Bear Cafe 9'} imageUrl={'https://placebear.com/700/700'} imageAlt={'yeet'}/>
                </CarouselSlide>
            </Carousel>
        </div>
    )
}

 function ShopCard ({imageUrl, imageAlt, shopName}: ShopCardProps) {

    return (
        <Card>
            <a href={''}>
                <CardImage imageUrl={imageUrl} imageAlt={imageAlt}/>
                <CardBody>
                    <div className={'prose'}><h1>{shopName}</h1></div>
                </CardBody>
            </a>
        </Card>
    )
}

function TagSection () {
    return <>
        <TagList group={busyTags}/>
        <TagList group={drinkTags}/>
        <TagList group={customTags}/>
    </>
}

async function getShopData(): Promise<any> {
    const requestData = getRequestData()
    const url = `${process.env.REST_API_URL}/shop/`
    const response = await fetch(url, requestData)
    return await response.json()
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

function getRequestData (): RequestInit {
    return {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type":
                'application/json'
        }
    }
}
