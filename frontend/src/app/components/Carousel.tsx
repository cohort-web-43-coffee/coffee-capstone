import {ChildProps} from '@/app/types/ChildProps'


export function Carousel (props: ChildProps) {
    return (<div className="carousel w-full">
        {props.children}
    </div>)
}

type SlideProps = ChildProps & {
    slideId: string,
    nextSlideId: string,
    previousSlideId: string
}

export function CarouselSlide({slideId, children, nextSlideId, previousSlideId}: SlideProps) {
    return (
        <div id={slideId} className={'carousel-item relative w-full flex justify-around gap-4'}>
            {children}
            <CarouselSlideArrows previousSlideId={previousSlideId} nextSlideId={nextSlideId}/>
        </div>
    )
}

type CarouselArrowsProps = {
    previousSlideId: string,
    nextSlideId: string
}
function CarouselSlideArrows({previousSlideId, nextSlideId}: CarouselArrowsProps) {
    return (
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={`#${previousSlideId}`} className="btn btn-circle">❮</a>
            <a href={`#${nextSlideId}`} className="btn btn-circle">❯</a>
        </div>
    )
}