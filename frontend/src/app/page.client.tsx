'use client'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {Tag, TagButton, TagGroup} from '@/components/Tag'
import React from 'react';
import {CarouselSlide, getNextSlideIndex, getPreviousSlideIndex} from '@/components/Carousel'
import Link from 'next/link'
import {Card, CardBody, CardImage} from '@/components/Card'
import {ClassProps, ImageProps} from '@/types/Props'
import { useMedia } from 'react-use';

type TagFilterListProps = {
    showCounts?: boolean,
    group: TagGroup,
    activeTags: Set<string>,
    startChecked?: boolean
}
type ShopCardProps = ImageProps & {
    shopName: string
    shopAddress: string
}

type ShopSlidesProps = ClassProps & {
    shopData: any[]
}

export function TagFilterList ({group, showCounts, activeTags, startChecked}: Readonly<TagFilterListProps>) {
    const router = useRouter()
    const pathName = usePathname()
    const currentParams = useSearchParams()

    const handleTagButtonChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newParams = new URLSearchParams(currentParams)
        const tagId = event.currentTarget.id
        let newTagSet: Set<string> = new Set<string>(activeTags)

        if (event.target.checked) {
            newTagSet = newTagSet.add(tagId)
        } else {
            newTagSet.delete(tagId)
        }

        newParams.set('tags', Array.from(newTagSet).join(','))
        router.push(`${pathName}?${newParams.toString()}`)
    }

    return (
        <div className={'collapse collapse-arrow'}>
            <input type={'checkbox'} name={'filter-accordion'} className={'min-w-full'} defaultChecked={startChecked ?? false}/>
            <div className={'collapse-title text-xl font-medium'}>
                <div className={'divider'}>{group.group}</div>
            </div>
            <div className={'collapse-content flex flex-wrap gap-6 justify-around'}>
                {group.tags
                    .map((tag: Tag) => <TagButton tag={tag}
                                                  key={tag.tagId}
                                                  checked={activeTags?.has(tag.tagId)}
                                                  showCount={showCounts}
                                                  handleChanged={handleTagButtonChanged}/>)
                }
            </div>
        </div>
    )
}

export function ShopSlides ({shopData}: Readonly<ShopSlidesProps>) {
    const idPrefix = 'slide'
    const isLg = useMedia('(min-width: 1024px)', false)
    const isSm = useMedia('(min-width: 640px)', false)
    const pageSize = isLg ? 6 : isSm ? 4 : 2

    return shopData.length > 0 ? sliceSplit(shopData, pageSize)
        .map((split: any, slideIndex: number, splitCollection: any[]) => {
                const previousSlideIndex = getPreviousSlideIndex(slideIndex, splitCollection.length)
                const nextSlideIndex = getNextSlideIndex(slideIndex, splitCollection.length)
                return (
                    <CarouselSlide
                        className={`grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}
                        key={`${idPrefix}${slideIndex}`}
                        slideId={`${idPrefix}${slideIndex}`}
                        previousSlideId={`${idPrefix}${previousSlideIndex}`}
                        nextSlideId={`${idPrefix}${nextSlideIndex}`}>
                        {split.map((shop: any) => {
                            return (
                                <Link key={`${idPrefix}${shop.shopId}`} href={`/shop/${shop.shopId}`}>
                                    <ShopCard
                                        imageUrl={shop?.shopPhotoUrl === '' ? '/coffee.svg' : shop.shopPhotoUrl ?? '/coffee.svg'}
                                        imageAlt={shop.shopName}
                                        shopName={shop.shopName}
                                        shopAddress={shop.shopAddress}/>
                                </Link>)
                        })}
                    </CarouselSlide>)
            }
        ) : <p>No shops matching your filters.</p>
}

function ShopCard ({imageUrl, imageAlt, shopName, shopAddress}: Readonly<ShopCardProps>) {
    return (
        <Card>
            <CardImage imageUrl={imageUrl} imageAlt={imageAlt}/>
            <CardBody>
                <h1 className={'text-lg font-bold'}>{shopName}</h1>
                <p className={'text-xs'}>{shopAddress}</p>
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