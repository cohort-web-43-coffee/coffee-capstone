'use server'

import {PrimarySection} from '@/app/components/Section'
import {PrimaryContainer} from '@/app/components/Container'
import {TagList} from '@/app/components/Tag'
import {busyTags, customTags, drinkTags} from '@/app/mocks/tags'
import {Carousel, CarouselSlide} from '@/app/components/Carousel'
import {getRestData, postRestData} from '@/app/utils/fetch'

type HomePageProps = {
    tags: string[] | undefined
}
export default async function HomePage ({tags}: HomePageProps) {
    const shopData = tags ? await postRestData('/shop/getShopsWithTags', JSON.stringify(tags)) : await getRestData('/shop')

    return (
        <>
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
                    <TagList group={busyTags}/>
                    <TagList group={drinkTags}/>
                    <TagList group={customTags}/>
                </PrimaryContainer>
            </PrimarySection>
        </>
    )
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