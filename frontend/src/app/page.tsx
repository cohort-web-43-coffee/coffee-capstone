import {PrimarySection} from '@/app/components/Section'
import {PrimaryContainer} from '@/app/components/Container'
import {TagList} from '@/app/components/Tag'
import {busyTags, customTags, drinkTags} from '@/app/mocks/tags'
import React from 'react'
import {Carousel, CarouselSlide} from '@/app/components/Carousel'
import {getRestData} from "@/app/utils/fetch"
import {MenuButton, MenuContent, SearchField, SiteTitle} from "@/app/layout/NavBar";
import {SignUpModal} from "@/app/layout/SignUpModal"
import Link from "next/link";


export default async function HomePage({searchParams}: { searchParams: { q: string } }) {
    const searchResult = await getSearchData(searchParams.q)
    console.log('testing the search data',)
    return (
        <>
            <nav className={'navbar'}>
                <div className={'dropdown'}>
                    <MenuButton/>
                    <ul className={'menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-32'}>
                        <MenuContent/>
                    </ul>
                </div>
                <div className={'flex-1'}>
                    <SiteTitle/>
                </div>
                <div className={'flex-none'}>
                    Search:&nbsp;
                    <div className={'dropdown'}>
                        <SearchField>
                            <div tabIndex={0}>

                                <ul tabIndex={0}
                                    className={'dropdown-content z-10 menu grid p-2 shadow bg-base-100 rounded-box sm:w-20 md:w-52 max-h-52 overflow-y-auto gap-4'}>
                                    {searchResult.map((shop: any) => <Link href={`/shop/${shop.shopId}`}><li key={shop.shopId}>{shop.shopName}</li></Link>)}

                                </ul>

                            </div>
                        </SearchField>
                    </div>
                    <div className={'navbar-center hidden md:flex'}>
                        <ul className={'menu menu-horizontal px-1'}>
                            <MenuContent/>
                        </ul>
                    </div>
                </div>
                <SignUpModal/>
            </nav>
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