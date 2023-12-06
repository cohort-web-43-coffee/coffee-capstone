import {ChildProps, ImageProps} from '@/types/Props'
import Image from 'next/image'

export function Card ({children}: Readonly<ChildProps>) {
    return (
        <div className={'card bg-base-100 text-base-content shadow-md p-4'}>
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