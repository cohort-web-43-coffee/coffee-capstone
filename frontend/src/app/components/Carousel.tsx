import {ChildProps} from '@/app/types/Props'

type SlideProps = ChildProps & {
    slideId: string,
    nextSlideId: string,
    previousSlideId: string
}

type CarouselNavProps = {
    previousSlideId: string,
    nextSlideId: string
}

export function Carousel (props: ChildProps) {
    return (<div className="carousel w-full">
        {props.children}
    </div>)
}

export function CarouselSlide({slideId, children, nextSlideId, previousSlideId}: SlideProps) {
    return (
        <div id={slideId} className={'carousel-item relative w-full flex justify-around gap-4'}>
            {children}
            <CarouselNav previousSlideId={previousSlideId} nextSlideId={nextSlideId}/>
        </div>
    )
}

function CarouselNav({previousSlideId, nextSlideId}: CarouselNavProps) {
    return (
        <nav className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={`#${previousSlideId}`} className="btn btn-circle">❮</a>
            <a href={`#${nextSlideId}`} className="btn btn-circle">❯</a>
        </nav>
    )
}