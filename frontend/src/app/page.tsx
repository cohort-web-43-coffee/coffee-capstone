'use client'

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

export default function HomePage() {
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

async function ShopList() {
    const allShopData = (await getShopData()).data
    // const firstShopData = allShopData.splice(0, 3)
    const shopSplits = sliceSplit(allShopData, 3)
    return (
        <div className="flex-row justify-center">
            <Carousel>
                {shopSplits.map((split: any, slideIndex: number) => {
                    const previousSlideIndex = slideIndex === 0 ? shopSplits.length - 1 : slideIndex - 1
                    const nextSlideIndex = slideIndex === shopSplits.length - 1 ? 0: slideIndex + 1
                    return <CarouselSlide slideId={`slide${slideIndex}`} shopArray={split} previousSlideId={`slide${previousSlideIndex}`}
                                          nextSlideId={`slide${nextSlideIndex}`}/>
                })}

            </Carousel>
        </div>
    )
}


function TagSection() {
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

function sliceSplit(array: Array<any>, sliceSize: number) {
    return array.reduce((all, one, i) => {
        const ch = Math.floor(i / sliceSize)
        all[ch] = [].concat((all[ch] || []), one)
        return all
    }, [])
}