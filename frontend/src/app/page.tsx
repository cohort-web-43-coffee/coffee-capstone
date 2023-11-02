'use client'

import {ShopListCard} from "@/app/components/Card";
import {PrimarySection, SecondarySection} from '@/app/components/Sections'
import {Container} from '@/app/components/Container'
import {TagList} from '@/app/components/Tags'
import {busyTags, customTags, drinkTags} from '@/app/mocks/tags'
import React from 'react'

export default function HomePage () {

    return (
        <>
            <PrimarySection>
                <Container autoMargins>
                    <ShopList/>
                </Container>
            </PrimarySection>
            <SecondarySection>
                <Container autoMargins>
                    <TagSection/>
                </Container>
            </SecondarySection>
        </>
    )
}

function ShopList () {
    return (
        <>
            <div className="card mx-full mt-80 p-5 bg-amber-900 flex-row justify-center">
                <ShopListCard imageUrl={'https://placebear.com/900/900'} alt={'yeet'}/>
                <ShopListCard imageUrl={'https://placebear.com/900/900'} alt={'yeet'}/>
                <ShopListCard imageUrl={'https://placebear.com/900/900'} alt={'yeet'}/>
            </div>
        </>
    )
}

function TagSection () {
    return <>
        <TagList group={busyTags}/>
        <TagList group={drinkTags}/>
        <TagList group={customTags}/>
    </>
}