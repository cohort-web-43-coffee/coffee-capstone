import {PrimarySection} from '@/components/Section'
import {PrimaryContainer} from '@/components/Container'
import {Carousel, CarouselSlide, getNextSlideIndex, getPreviousSlideIndex} from '@/components/Carousel'
import {getRestData, postRestData} from '@/utils/fetchHeaders'
import {TagFilterList} from '@/app/page.client'
import Link from 'next/link'
import React from 'react'
import {Card, CardBody, CardImage} from '@/components/Card'
import {ClassProps, ImageProps} from '@/types/Props'

type HomePageProps = {
    searchParams: {
        q: string
        tags: string
    }
}

type ShopCardProps = ImageProps & {
    shopName: string
    shopAddress: string
}

type ShopSlidesProps = ClassProps & {
    shopData: any[]
    pageSize: number
    idPrefix: string
}

export default async function HomePage ({searchParams}: Readonly<HomePageProps>) {
    const tagArray = searchParams.tags?.split(',').filter(value => value != '')
    const tags = new Set<string>(tagArray)
    const shopData = tags?.size > 0 ? await postRestData('/apis/shop/getShopsWithTags', JSON.stringify(tagArray)) : await getRestData('/apis/shop')

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
        <PrimarySection>
            <PrimaryContainer>
                <div className={'flex flex-col-reverse md:flex-col p-4'}>
                    <Carousel className={'flex sm:hidden'}>
                        <ShopSlides idPrefix={'mobile'} shopData={shopData} pageSize={2} className={'grid-cols-1'}/>
                    </Carousel>
                    <Carousel className={'hidden sm:flex lg:hidden'}>
                        <ShopSlides idPrefix={'tablet'} shopData={shopData} pageSize={4} className={'grid-cols-2'}/>
                    </Carousel>
                    <Carousel className={'hidden lg:flex'}>
                        <ShopSlides idPrefix={'desktop'} shopData={shopData} pageSize={6} className={'grid-cols-3'}/>
                    </Carousel>
                    <div className={'block md:hidden'}>
                        <TagFilterList group={brewingTags} activeTags={tags} startChecked/>
                        <TagFilterList group={serviceTags} activeTags={tags}/>
                        <TagFilterList group={busyTags} activeTags={tags}/>
                    </div>
                    <div className={'hidden md:block'}>
                        <TagFilterList group={brewingTags} activeTags={tags} startChecked/>
                        <TagFilterList group={serviceTags} activeTags={tags} startChecked/>
                        <TagFilterList group={busyTags} activeTags={tags} startChecked/>
                    </div>
                </div>

            </PrimaryContainer>
        </PrimarySection>
    )
}


function ShopSlides ({shopData, pageSize, className, idPrefix}: ShopSlidesProps) {
    return shopData.length > 0 ? sliceSplit(shopData, pageSize)
        .map((split: any, slideIndex: number, splitCollection: any[]) => {
            const previousSlideIndex = getPreviousSlideIndex(slideIndex, splitCollection.length)
            const nextSlideIndex = getNextSlideIndex(slideIndex, splitCollection.length)
            return (
                <CarouselSlide
                    className={`grid gap-2 ${className}`}
                    key={`${idPrefix}${slideIndex}`}
                    slideId={`${idPrefix}${slideIndex}`}
                    previousSlideId={`${idPrefix}${previousSlideIndex}`}
                    nextSlideId={`${idPrefix}${nextSlideIndex}`}>
                    {split.map(async (shop: any) => {
                        return (
                            <Link key={`${idPrefix}${shop.shopId}`} href={`/shop/${shop.shopId}`}>
                                <ShopCard
                                    imageUrl={shop?.shopPhotoUrl}
                                    imageAlt={shop.shopName}
                                    shopName={shop.shopName}
                                    shopAddress={shop.shopAddress}/>
                            </Link>)
                    })}
                </CarouselSlide>)
        }) : <p>No shops matching your filters.</p>
}

function ShopCard ({imageUrl, imageAlt, shopName, shopAddress}: Readonly<ShopCardProps>) {
    return (
        <Card>
            <CardImage imageUrl={imageUrl} imageAlt={imageAlt}/>
            <CardBody>
                <h1 className={'text-lg font-bold'}>{shopName}</h1>
                <p className={'text-base text-xs'}>{shopAddress}</p>
            </CardBody>
        </Card>
    )

}

function sliceSplit (array: Array<any>, sliceSize: number) {
    return array.reduce((accumulator, element, index) => {
        const sliceIndex = Math.floor(index / sliceSize)
        accumulator[sliceIndex] = [].concat((accumulator[sliceIndex] || []), element)
        return accumulator
    }, [])
}