type CardProps = {
    text: string
    pixels: number
}

export function BookmarkCard(cardProps: CardProps) {
    const {text, pixels} = cardProps
    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure><img src="" alt="Movie"/></figure>
            <div className="card-body">
                <h2 className="card-title">{text}</h2>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Watch</button>
                </div>
            </div>
        </div>
    )
}