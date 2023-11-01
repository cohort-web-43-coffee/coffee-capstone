'use client'

type ShopListCardProps = {
    imageUrl: string,
    alt: string
}

export function ShopListCard (props: ShopListCardProps) {
    const {imageUrl, alt} = props
    return (
        <figure className="mx-10 h-60 w-60">
            <img src={imageUrl} alt={alt} className="rounded-2xl"/>
        </figure>
    )
}
export function AccountCard () {
    return (<>
            <div className={'text-center font-bold text-xl p-4'}>
                <h1>ACCOUNT</h1>
            </div>
            <div className={'grid grid-cols-2'}>
                <h1 className={'text-lg'}>NAME:</h1><p>Frederick Douglas</p>
                <h1 className={'text-lg'}>EMAIL:</h1><p>fakeemail@realemail.com</p>
            </div>
        </>
    )
}

type CardProps = {
    name: string
    address: string
    phone: string
    pixels: number
}

export function BookmarkCard(cardProps: CardProps) {
    const {name, address, phone, pixels} = cardProps
    const id = random(1084)
    return (
        <div className={"container mx-auto flex"}>
            <img src={`https://picsum.photos/id/${id}/${pixels}/${pixels}`} alt={"picture"} className={"container rounded-lg self-center m-4 w-48 h-48 block"}/>
            <ul className={"text-white"}>
                <li className={"container p-4"}>{name}</li>
                <li className={"container p-4"}>{address}</li>
                <li className={"container p-4"}>{phone}</li>
            </ul>
        </div>
    )
}

function random(max: number) {
    return Math.floor(Math.random() * max)
}