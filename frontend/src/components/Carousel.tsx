import {ChildProps, ClassProps} from '@/types/Props'
import React from 'react'
import Link from 'next/link'


type SlideProps = ChildProps & ClassProps & {
    slideId: string,
    nextSlideId: string,
    previousSlideId: string,
}

type CarouselNavProps = {
    previousSlideId: string,
    nextSlideId: string
}

export function Carousel(props: Readonly<ChildProps>) {
    return (<div className={'carousel w-full'}>
        {props.children}
    </div>)
}

export function CarouselSlide({slideId, nextSlideId, previousSlideId, children, className}: Readonly<SlideProps>) {
    return (
        <div id={slideId}
             className={`carousel-item relative w-full ${className}`}>
            {children}
            <CarouselNav previousSlideId={previousSlideId} nextSlideId={nextSlideId}/>
        </div>
    )
}

function CarouselNav({previousSlideId, nextSlideId}: Readonly<CarouselNavProps>) {
    return (
        <nav className={'absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'}>
            <Link href={`#${previousSlideId}`} className={'btn btn-circle'} replace>❮</Link>
            <Link href={`#${nextSlideId}`} className={'btn btn-circle'} replace>❯</Link>
        </nav>
    )
}

export function getPreviousSlideIndex(slideIndex: number, max: number) {
    return slideIndex === 0 ? max - 1 : slideIndex - 1;
}

export function getNextSlideIndex(slideIndex: number, max: number) {
    return slideIndex === max - 1 ? 0 : slideIndex + 1;
}