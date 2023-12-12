import {Carousel} from '@/components/Carousel'
import {getRestData, postRestData} from '@/utils/fetchHeaders'
import {ShopSlides, TagFilterList} from '@/app/page.client'
import React from 'react'
import {Section} from '@/components/Section'

type HomePageProps = {
    searchParams: {
        q: string
        tags: string
    }
}

export default async function HomePage ({searchParams}: Readonly<HomePageProps>) {
    const tagArray = searchParams.tags?.split(',').filter(value => value != '')
    const tags = new Set<string>(tagArray)
    const shopData = tags?.size > 0 ? await postRestData('/apis/shop/tag', tagArray) : await getRestData('/apis/shop')

    const brewingTags = {
        group: 'Brewing',
        tags: await getRestData('/apis/tag/group/brewing')
    }
    const busyTags = {
        group: 'Busy Times',
        tags: await getRestData('/apis/tag/group/busy')
    }
    const serviceTags = {
        group: 'Service',
        tags: await getRestData('/apis/tag/group/service')
    }
    return (
        <Section className={'p-4'}>
            <div className={'flex flex-col-reverse md:flex-col'}>
                <Carousel className={'pb-4'}>
                    <ShopSlides shopData={shopData}/>
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
        </Section>
    )
}