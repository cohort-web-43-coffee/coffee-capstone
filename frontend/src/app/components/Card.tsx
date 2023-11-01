'use client'

import {ChildProps} from '@/app/types/ChildProps'

type ShopListCardProps = {
    imageUrl: string,
    alt: string
}

type CardImageProps = {
    imageUrl: string,
    alt: string
}

export function ShopListCard (props: ShopListCardProps) {
    const {imageUrl, alt} = props
    return (
        <NormalCard>
            <CardImage imageUrl={imageUrl} alt={alt}/>
        </NormalCard>
    )
}

export function AccountCard () {
    return (<>
            <NormalCard>
                <div className={'place-self-center'}>
                    <CardTitle>Accounts</CardTitle>
                </div>
                <CardBody>
                    <div className={'grid grid-cols-2 justify-items-center'}>
                        <h1 className={'text-lg'}>NAME:</h1><p>Frederick Douglas</p>
                        <h1 className={'text-lg'}>EMAIL:</h1><p>fakeemail@realemail.com</p>
                    </div>
                </CardBody>
            </NormalCard>
        </>
    )
}

type BookmarkCardProps = {
    name: string
    address: string
    phone: string
    pixels: number
}

export function BookmarkCard (cardProps: BookmarkCardProps) {
    const {name, address, phone, pixels} = cardProps
    const id = Math.floor(Math.random() * 1084)
    return (
        <NormalCard>
            <CardImage imageUrl={`https://picsum.photos/id/${id}/${pixels}/${pixels}`} alt={'picture'}/>
            <CardBody>
                <div className={"flex"}>
                    <ul>
                        <li className={"container p-4"}>{name}</li>
                        <li className={"container p-4"}>{address}</li>
                        <li className={"container p-4"}>{phone}</li>
                    </ul>
                </div>
            </CardBody>
        </NormalCard>
    )
}


function NormalCard (props: ChildProps) {
    return (
        <div className="card w-96 p-4 bg-white text-black shadow-xl">
            {props.children}
        </div>
    )
}


function CardImage (props: CardImageProps) {
    const {imageUrl, alt} = props
    return (
        <figure><img src={imageUrl} alt={alt}/></figure>
    )
}

function CardBody (props: ChildProps) {
    return (
        <div className="card-body">
            {props.children}
        </div>
    )
}

function CardTitle (props: ChildProps) {
    return (
        <div className="card-title">
            {props.children}
        </div>
    )
}

function CardActions (props: ChildProps) {
    return (
        <div className="card-actions justify-end">
            {props.children}
        </div>
    )
}