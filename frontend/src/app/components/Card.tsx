'use client'

import {ChildProps, ImageProps} from '@/app/types/Props'

type ShopListCardProps = ImageProps & {
    shopName: string
}

type BookmarkCardProps = {
    name: string
    address: string
    phone: string
    pixels: number
}

export function ShopCard ({imageUrl, imageAlt, shopName}: ShopListCardProps) {
    return (
        <NormalCard>
            <a href={''}>
                <CardImage imageUrl={imageUrl} imageAlt={imageAlt}/>
                <CardBody>
                    <div className={'prose'}><h1>{shopName}</h1></div>
                </CardBody>
            </a>
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

export function BookmarkCard ({name, address, phone, pixels}: BookmarkCardProps) {
    const id = Math.floor(Math.random() * 1084)
    return (
        <NormalCard>
            <CardImage imageUrl={`https://picsum.photos/id/${id}/${pixels}/${pixels}`} imageAlt={'picture'}/>
            <CardBody>
                <div className={"flex"}>
                    <ul>
                        <li className={"container p-4"}>{name}</li>
                        <li className={"container p-4"}>{address}</li>
                        <li className={"container p-4"}>{phone}</li>
                        <li className={"btn btn-accent rounded-lg"}>Delete Bookmark</li>
                    </ul>
                </div>
            </CardBody>
        </NormalCard>
    )
}

type AboutUsCardProps = {
    text: string
}

export function AboutUsCard (cardProps: AboutUsCardProps) {
    const {text} = cardProps
    return (
        <div>
            <img src={`https://picsum.photos/id/30/300/300`} alt={'picture of developers'} className={'rounded-full'}/>
            <p>{text}</p>
        </div>
    )
}

function NormalCard (props: ChildProps) {
    return (
        <div className="card w-96 p-4 bg-white text-black shadow-xl">
            {props.children}
        </div>
    )
}

function CardImage ({imageUrl, imageAlt}: ImageProps) {
    return (
        <figure><img src={imageUrl} alt={imageAlt}/></figure>
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

// noinspection JSUnusedLocalSymbols
function CardActions (props: ChildProps) {
    return (
        <div className="card-actions justify-end">
            {props.children}
        </div>
    )
}