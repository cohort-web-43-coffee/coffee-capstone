
import {PrimarySection} from '@/app/components/Section'
import {PrimaryContainer} from '@/app/components/Container'
import {TagList} from '@/app/components/Tag'
import {busyTags, customTags, drinkTags} from '@/app/mocks/tags'
import React from 'react'
import {Carousel, CarouselSlide} from '@/app/components/Carousel'
import {ImageProps} from '@/app/types/Props'
import {getRestData} from "@/app/utils/fetch";


export default async function HomePage({searchParams}: { searchParams: { q: string } }) {
    const searchResult =  await getSearchData(searchParams.q)
    console.log('testing the search data', searchResult)
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
    const allShopData = await getShopData()
    const shopSplits = sliceSplit(allShopData, 3)
    return (
        <div className="flex-row justify-center">
            <Carousel>
                {shopSplits.map((split: any, slideIndex: number) => {
                    const previousSlideIndex = getPreviousSlideIndex(slideIndex, shopSplits)
                    const nextSlideIndex = getNextSlideIndex(slideIndex, shopSplits)
                    return <CarouselSlide slideId={`slide${slideIndex}`} shopArray={split}
                                          previousSlideId={`slide${previousSlideIndex}`}
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
    const endpoint = `/shop`
    return await getRestData(endpoint)
}

function getPreviousSlideIndex(slideIndex: number, shopSplits: any) {
    return slideIndex === 0 ? shopSplits.length - 1 : slideIndex - 1;
}

function getNextSlideIndex(slideIndex: number, shopSplits: any) {
    return slideIndex === shopSplits.length - 1 ? 0 : slideIndex + 1;
}

function sliceSplit(array: Array<any>, sliceSize: number) {
    return array.reduce((accumulator, element, index) => {
        const sliceIndex = Math.floor(index / sliceSize)
        accumulator[sliceIndex] = [].concat((accumulator[sliceIndex] || []), element)
        return accumulator
    }, [])
}

async function getSearchData(query: string): Promise<any> {
    const endpoint = `/shop/search?name=${query}`
    return await getRestData(endpoint)
}