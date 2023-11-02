'use client'

import {SecondarySection} from '@/app/components/Sections'
import React from 'react'
import {Container} from '@/app/components/Container'
import {busyTags, customTags, drinkTags} from '@/app/mocks/tags'
import {TagList} from '@/app/components/Tags'


export default function ShopPage () {
    return <>
        <ImagesSection/>
    </>
}

function ImagesSection () {
    return <SecondarySection>
        <Container autoMargins>
            <div>Button state: <button className={'btn btn-primary'}>Regular</button>
                <button className={'btn btn-success'}>Applied</button>
                <input type="checkbox" aria-label="Checkbox" className="btn btn-neutral" style={{backgroundImage: 'none'}}/>
            </div>
            <TagList group={customTags} showCounts>
                <button className={'btn btn-primary btn-xs rounded-full'}>New +</button>
            </TagList>
            <TagList group={drinkTags} showCounts/>
            <TagList group={busyTags} showCounts/>
        </Container>
    </SecondarySection>
}