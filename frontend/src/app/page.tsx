'use client'

import {CardBody, CardImage, Card} from "@/app/components/Card";
import {PrimarySection, SecondarySection} from '@/app/components/Section'
import {Container} from '@/app/components/Container'
import {TagList} from '@/app/components/Tag'
import {busyTags, customTags, drinkTags} from '@/app/mocks/tags'
import React from 'react'
import {Carousel, CarouselSlide} from '@/app/components/Carousel'
import {ImageProps} from '@/app/types/Props'

type ShopCardProps = ImageProps & {
    shopName: string
}

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
        <div className="card mx-full p-5 bg-amber-900 flex-row justify-center">
            <Carousel>
                <CarouselSlide slideId={'Weee1'} previousSlideId={'Weee3'} nextSlideId={'Weee2'}>
                    <ShopCard shopName={'Bear Cafe 1'} imageUrl={'https://placebear.com/900/900'} imageAlt={'yeet'}/>
                    <ShopCard shopName={'Bear Cafe 2'} imageUrl={'https://placebear.com/900/900'} imageAlt={'yeet'}/>
                    <ShopCard shopName={'Bear Cafe 3'} imageUrl={'https://placebear.com/900/900'} imageAlt={'yeet'}/>
                </CarouselSlide>
                <CarouselSlide slideId={'Weee2'} previousSlideId={'Weee1'} nextSlideId={'Weee3'}>
                    <ShopCard shopName={'Bear Cafe 5'} imageUrl={'https://placebear.com/800/800'} imageAlt={'yeet'}/>
                    <ShopCard shopName={'Bear Cafe 7'} imageUrl={'https://placebear.com/800/800'} imageAlt={'yeet'}/>
                    <ShopCard shopName={'Bear Cafe 3'} imageUrl={'https://placebear.com/800/800'} imageAlt={'yeet'}/>
                </CarouselSlide>
                <CarouselSlide slideId={'Weee3'} previousSlideId={'Weee2'} nextSlideId={'Weee1'}>
                    <ShopCard shopName={'Bear Cafe 2'} imageUrl={'https://placebear.com/700/700'} imageAlt={'yeet'}/>
                    <ShopCard shopName={'Bear Cafe 1'} imageUrl={'https://placebear.com/700/700'} imageAlt={'yeet'}/>
                    <ShopCard shopName={'Bear Cafe 9'} imageUrl={'https://placebear.com/700/700'} imageAlt={'yeet'}/>
                </CarouselSlide>
            </Carousel>
        </div>
    )
}

 function ShopCard ({imageUrl, imageAlt, shopName}: ShopCardProps) {
    return (
        <Card>
            <a href={''}>
                <CardImage imageUrl={imageUrl} imageAlt={imageAlt}/>
                <CardBody>
                    <div className={'prose'}><h1>{shopName}</h1></div>
                </CardBody>
            </a>
        </Card>
    )
}

function TagSection () {
    return <>
        <TagList group={busyTags}/>
        <TagList group={drinkTags}/>
        <TagList group={customTags}/>
    </>
}