import {ChildProps, ImageProps} from '@/types/Props'
import Image from 'next/image'

export function Card ({children}: Readonly<ChildProps>) {
    return (
        <div className={'card bg-base-100 text-black shadow-xl p-4'}>
            {children}
        </div>
    )
}

export function MediumCard({children}: Readonly<ChildProps>) {
    return (
        <div className={'card p-4 bg-base-100 text-black shadow-xl'}>
            {children}
        </div>
    )
}

export function CardImage ({imageUrl, imageAlt}: Readonly<ImageProps>) {
    return (
        <figure className={'relative h-60 md:h-96 rounded-lg'}>
            <Image src={imageUrl} alt={imageAlt} fill className={'w-auto h-auto object-cover'}/>
        </figure>
    )
}

export function CardBody ({children}: Readonly<ChildProps>) {
    return (
        <div className={'card-compact md:card-body'}>
            {children}
        </div>
    )
}

export function CardTitle ({children}: Readonly<ChildProps>) {
    return (
        <div className={'card-title'}>
            {children}
        </div>
    )
}

export function CardActions ({children}: Readonly<ChildProps>) {
    return (
        <div className={'card-actions justify-end'}>
            {children}
        </div>
    )
}