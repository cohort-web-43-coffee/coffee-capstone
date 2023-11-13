import {PrimarySection, SecondarySection} from '@/app/components/Section'
import {PrimaryContainer} from '@/app/components/Container'
import {TagList} from '@/app/components/Tag'
import {Carousel, CarouselSlide} from '@/app/components/Carousel'
import {MenuButton, MenuContent, SearchField, SiteTitle} from "@/app/layout/NavBar"
import {SignInModal, SignUpModal} from "@/app/layout/SignUpModal"
import Link from "next/link"
import {getRestData, postRestData} from '@/app/utils/fetch'

type HomePageProps = {
    searchParams: {
        q: string,
        tags: string
    }
}

export default async function HomePage({searchParams}: HomePageProps) {
    const query = searchParams.q
    const tagArray = searchParams.tags?.split(',').filter(value => value != '')
    const tags = new Set<string>(tagArray)
    const shopData = tags?.size > 0 ? await postRestData('/apis/shop/getShopsWithTags', JSON.stringify(tagArray)) : await getRestData('/apis/shop')
    const searchResult = await getRestData(`/apis/shop/search?name=${query}`)
    const brewingTags = {
        group: 'Brewing',
        tags: await getRestData('/apis/tag/tagGroup/brewing')
    }
    const busyTags = {
        group: 'Busy Times',
        tags: await getRestData('/apis/tag/tagGroup/busy')
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
                    <div className="">
                        <Carousel>
                            {shopData.length > 0 ? sliceSplit(shopData, 6)
                                .map((split: any, slideIndex: number, splitCollection: any[]) => {
                                    const previousSlideIndex = getPreviousSlideIndex(slideIndex, splitCollection.length)
                                    const nextSlideIndex = getNextSlideIndex(slideIndex, splitCollection.length)
                                    return <CarouselSlide key={`slide${slideIndex}`}
                                                          slideId={`slide${slideIndex}`} shopArray={split}
                                                          previousSlideId={`slide${previousSlideIndex}`}
                                                          nextSlideId={`slide${nextSlideIndex}`}/>


                                }) : <p>No shops matching your filters.</p>}
                        </Carousel>
                    </div>
                    <TagList group={brewingTags} activeTags={tags}/>
                    <TagList group={serviceTags} activeTags={tags}/>
                    <TagList group={busyTags} activeTags={tags}/>
                </PrimaryContainer>
            </PrimarySection>
        </>
    )
}

function getPreviousSlideIndex(slideIndex: number, max: number) {
    return slideIndex === 0 ? max - 1 : slideIndex - 1;
}

function getNextSlideIndex(slideIndex: number, max: number) {
    return slideIndex === max - 1 ? 0 : slideIndex + 1;
}

function sliceSplit(array: Array<any>, sliceSize: number) {
    return array.reduce((accumulator, element, index) => {
        const sliceIndex = Math.floor(index / sliceSize)
        accumulator[sliceIndex] = [].concat((accumulator[sliceIndex] || []), element)
        return accumulator
    }, [])
}