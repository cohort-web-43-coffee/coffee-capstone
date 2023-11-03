'use client'

import {ShopListCard} from "@/app/components/Card";
import {PrimarySection, SecondarySection} from '@/app/components/Sections'
import {Container} from '@/app/components/Container'
import {TagList} from '@/app/components/Tags'
import {busyTags, customTags, drinkTags} from '@/app/mocks/tags'
import React from 'react'
import {Carousel, CarouselSlide} from '@/app/components/Carousel'

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
                <Carousel>
                    <CarouselSlide slideId={'Weee1'} previousSlideId={'Weee3'} nextSlideId={'Weee2'}>
                        <ShopListCard shopName={'Bear Cafe 1'} imageUrl={'https://placebear.com/900/900'} alt={'yeet'}/>
                        <ShopListCard shopName={'Bear Cafe 2'} imageUrl={'https://placebear.com/900/900'} alt={'yeet'}/>
                        <ShopListCard shopName={'Bear Cafe 3'} imageUrl={'https://placebear.com/900/900'} alt={'yeet'}/>
                    </CarouselSlide>
                    <CarouselSlide slideId={'Weee2'} previousSlideId={'Weee1'} nextSlideId={'Weee3'}>
                        <ShopListCard shopName={'Bear Cafe 5'} imageUrl={'https://placebear.com/800/800'} alt={'yeet'}/>
                        <ShopListCard shopName={'Bear Cafe 7'} imageUrl={'https://placebear.com/800/800'} alt={'yeet'}/>
                        <ShopListCard shopName={'Bear Cafe 3'} imageUrl={'https://placebear.com/800/800'} alt={'yeet'}/>
                    </CarouselSlide>
                    <CarouselSlide slideId={'Weee3'} previousSlideId={'Weee2'} nextSlideId={'Weee1'}>
                        <ShopListCard shopName={'Bear Cafe 2'} imageUrl={'https://placebear.com/700/700'} alt={'yeet'}/>
                        <ShopListCard shopName={'Bear Cafe 1'} imageUrl={'https://placebear.com/700/700'} alt={'yeet'}/>
                        <ShopListCard shopName={'Bear Cafe 9'} imageUrl={'https://placebear.com/700/700'} alt={'yeet'}/>
                    </CarouselSlide>
                </Carousel>
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