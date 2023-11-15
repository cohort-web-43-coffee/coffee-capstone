'use client'
import {CardBody, CardImage, SmallCard} from "@/app/components/Card";
import {Session} from "@/utils/fetchSession";
import {useEffect, useState} from "react";
import {requestGetHeaders} from "@/app/utils/fetch";



type BookmarkCardProps = {
    name: string
    address: string
    phone: string
    pixels: number
}



type BookmarkListProps = {
    session? : Session
}
 type Bookmark = {
     bookmarkAccountId: string,
     bookmarkShopId: string,
     bookmarkOrder: number
 }
export async function BookmarkList({session}: BookmarkListProps ) {
    const [bookmarks, setBookmarks] = useState(new Array<Bookmark>())
    const effect = () => {
        const getRequestHeaders = requestGetHeaders(session)
        fetch("/apis/bookmark/bookmarkByAccountId/", getRequestHeaders)
            .then(response => response.json())
            .then((body) => setBookmarks(body.data))

    }
    useEffect(effect,[setBookmarks])

    return (
    <div
        className={'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-12 md:gap-x-12 justify-items-center'}>
        {bookmarks.map((bookmark: Bookmark) => {
            return (
                <BookmarkCard
                    key={bookmark.bookmarkShopId}
                name={""}
                address={"3759 Goldleaf Lane, Rochelle Park, NJ 07662"}
                phone={"676-153-3448"}
                pixels={300}/>)
        })}

    </div>
    )
}

function BookmarkCard({name, address, phone, pixels}: BookmarkCardProps) {
    const id = Math.floor(Math.random() * 1084)
    return (
        <SmallCard>
            <CardImage imageUrl={`https://picsum.photos/id/${id}/${pixels}/${pixels}`} imageAlt={'picture'}/>
            <CardBody>
                <div className={"flex text-xs sm:text-sm md:text-sm"}>
                    <ul>
                        <li className={"container p-1 sm:p-1 md:p-2 lg:p-2 text-lg font-bold"}>{name}</li>
                        <li className={"container p-1 sm:p-1 md:p-2 lg:p-2"}>{address}</li>
                        <li className={"container p-1 sm:p-1 md:p-2 lg:p-2"}>{phone}</li>
                        <li className={"btn btn-xs sm:btn sm:btn-sm md:btn lg:btn btn-secondary sm:btn-secondary md:btn-secondary lg:btn-secondary text-secondary-content rounded-lg p-1 sm:p-1 md:p-2 lg:p-2"}>Delete Bookmark</li>
                    </ul>
                </div>
            </CardBody>
        </SmallCard>
    )
}
