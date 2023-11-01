'use client'

import {SecondarySection} from '@/app/components/Sections'
import React from 'react'
import {Container} from '@/app/components/Container'
import {busyTags, customTags, drinkTags} from '@/app/mocks/tags'

type Tag = { label: string, count: number }
type TagGroup = { group: string, tags: Tag[] }
type TagProps = { tag: Tag }
type TagGroupProps = { group: TagGroup, children?: any }



export default function ShopPage () {
    return <>
        <ImagesSection/>
    </>
}

function ImagesSection () {
    return <SecondarySection>
        <Container autoMargins>
            <TagList group={customTags}>
                <button className={'btn btn-primary btn-xs rounded-full'}>New +</button>
            </TagList>
            <TagList group={drinkTags}/>
            <TagList group={busyTags}/>
        </Container>
    </SecondarySection>
}

function TagList (props: TagGroupProps) {
    const {group, children} = props
    return <>
        <div className={'divider'}>{group.group}{children}</div>
        <div className={'flex flex-wrap gap-6 justify-around'}>
            {group.tags
                .sort((a: Tag, b: Tag) => b.count - a.count)
                .map((tag: Tag) => <TagButton tag={tag}/>)}
        </div>
    </>
}

function TagButton (props: TagProps) {
    const {label, count} = props.tag
    return <button className={'btn btn-primary btn-xs md:btn-sm lg:btn-md'}>#{label} <em>{count}</em></button>
}