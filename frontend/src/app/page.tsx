'use server'

import {PrimarySection} from '@/app/components/Section'
import {PrimaryContainer} from '@/app/components/Container'
import {TagList} from '@/app/components/Tag'
import {Carousel, CarouselSlide} from '@/app/components/Carousel'
import {MenuButton, MenuContent, SearchField, SiteTitle} from "@/app/layout/NavBar"
import {SignInModal, SignUpModal} from "@/app/layout/SignUpModal"
import Link from "next/link"
import {getRestData} from '@/app/utils/fetch'

type HomePageProps = {
    searchParams: {
        q: string,
        tags: string[]
    }
}

export default async function HomePage ({searchParams}: HomePageProps) {
    const query = searchParams.q
    const shopData = await getRestData('/apis/shop')
    const searchResult = await getRestData(`/apis/shop/search?name=${query}`)
    const brewingTags = {
        group: 'Brewing',
        tags: await getRestData('/apis/tag/tagGroup/brewing')
    }
    const busyTags = {
        group: 'Busy Times',
        tags: await getRestData('/apis/tag/tagGroup/brewing')
    }
    const serviceTags = {
        group: 'Service',
        tags: await getRestData('/apis/tag/tagGroup/service')
    }
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
                        <SearchField initialText={query}>
                            <div tabIndex={0}>
                                <ul tabIndex={0}
                                    className={'dropdown-content z-10 menu grid p-2 shadow bg-base-100 rounded-box sm:w-40 md:w-52 max-h-52 overflow-y-auto gap-4'}>
                                    {searchResult.length > 0 ? searchResult.map((shop: any) => <Link
                                            href={`/shop/${shop.shopId}`}>
                                            <li key={shop.shopId}>{shop.shopName}</li>
                                        </Link>) :
                                        <p>No Results</p>}
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
                <SignInModal/>
            </nav>
            <PrimarySection>
                <PrimaryContainer autoMargins>
                    <div className="flex-row justify-center">
                        <Carousel>
                            {sliceSplit(shopData, 3).map((split: any, slideIndex: number) => {
                                const previousSlideIndex = getPreviousSlideIndex(slideIndex, split)
                                const nextSlideIndex = getNextSlideIndex(slideIndex, split)
                                return <CarouselSlide slideId={`slide${slideIndex}`} shopArray={split}
                                                      previousSlideId={`slide${previousSlideIndex}`}
                                                      nextSlideId={`slide${nextSlideIndex}`}/>
                            })}
                        </Carousel>
                    </div>
                    <TagList group={brewingTags}/>
                    <TagList group={serviceTags}/>
                    <TagList group={busyTags}/>
                </PrimaryContainer>
            </PrimarySection>
        </>
    )
}

function getPreviousSlideIndex (slideIndex: number, shopSplits: any) {
    return slideIndex === 0 ? shopSplits.length - 1 : slideIndex - 1;
}

function getNextSlideIndex (slideIndex: number, shopSplits: any) {
    return slideIndex === shopSplits.length - 1 ? 0 : slideIndex + 1;
}

function sliceSplit (array: Array<any>, sliceSize: number) {
    return array.reduce((accumulator, element, index) => {
        const sliceIndex = Math.floor(index / sliceSize)
        accumulator[sliceIndex] = [].concat((accumulator[sliceIndex] || []), element)
        return accumulator
    }, [])
}