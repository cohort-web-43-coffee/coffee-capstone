'use client'

import {ChildProps, ImageProps} from '@/app/types/Props'

export function Card ({children}: ChildProps) {
    return (
        <div className={'card w-96 p-4 bg-white text-black shadow-xl'}>
            {children}
        </div>
    )
}

export function CardImage ({imageUrl, imageAlt}: ImageProps) {
    return (
        <figure><img src={imageUrl} alt={imageAlt}/></figure>
    )
}

export function CardBody ({children}: ChildProps) {
    return (
        <div className="card-body">
            {children}
        </div>
    )
}

export function CardTitle ({children}: ChildProps) {
    return (
        <div className="card-title">
            {children}
        </div>
    )
}

export function CardActions ({children}: ChildProps) {
    return (
        <div className="card-actions justify-end">
            {children}
        </div>
    )
}