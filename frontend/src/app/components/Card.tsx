import {ChildProps, ImageProps} from '@/app/types/Props'

export function Card ({children}: ChildProps) {
    return (
        <div className={'card w-40 sm:w-52 md:w-56 lg:w-96 h-96 p-4 bg-base-100 text-black shadow-xl text-xs sm:text-sm md:text-lg'}>
            {children}
        </div>
    )
}

export function SmallCard({children}: ChildProps) {
    return (
        <div className={'card w-40 sm:w-52 md:w-56 lg:w-96 h-96 p-4 bg-base-100 text-black shadow-xl text-xs sm:text-sm md:text-lg'}>
            {children}
        </div>
    )
}

export function MediumCard({children}: ChildProps) {
    return (
        <div className={'card p-4 bg-base-100 text-black shadow-xl'}>
            {children}
        </div>
    )
}

export function CardImage ({imageUrl, imageAlt}: ImageProps) {
    return (
        <figure className={'h-60 md:h-96 rounded-lg'}><img src={imageUrl} alt={imageAlt}/></figure>
    )
}

export function CardBody ({children}: ChildProps) {
    return (
        <div className={"card-compact sm:card-compact md:card-body"}>
            {children}
        </div>
    )
}

export function CardTitle ({children}: ChildProps) {
    return (
        <div className={"card-title"}>
            {children}
        </div>
    )
}

export function CardActions ({children}: ChildProps) {
    return (
        <div className={"card-actions justify-end"}>
            {children}
        </div>
    )
}