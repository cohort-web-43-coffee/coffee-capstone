
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