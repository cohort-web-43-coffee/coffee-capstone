import {PrimarySection} from '@/app/components/Section'
import {PrimaryContainer} from '@/app/components/Container'
import {Carousel, CarouselSlide} from '@/app/components/Carousel'
import {getRestData, postRestData} from '@/app/utils/fetch'
import {TagFilterList} from '@/app/page.client'

type HomePageProps = {
    searchParams: {
        q: string,
        tags: string
    }
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
            <PrimaryContainer autoMargins>
                <div className={'flex flex-col-reverse md:flex-col'}>
                    <div className={"mt-5"}>
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