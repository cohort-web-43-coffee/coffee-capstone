'use client'

import {Tag, TagButton, TagGroup} from '@/components/Tag'
import {requestDeleteHeaders, requestGetHeaders, requestPostHeaders} from '@/utils/fetchHeaders'
import {Session} from '@/utils/fetchSession'
import React, {useEffect, useState} from 'react'
import {ImageProps, SessionProps} from "@/types/Props"
import {Modal, ModalActions} from "@/components/Modal"


type TagToggleListProps = {
    tagData: any[],
    shopId: string,
    session?: Session
}
type TagToggleGroupProps = {
    group: TagGroup,
    shopId: string,
    session?: Session,
    activeTags: string[],
    startChecked?: boolean
    activeTagsSetter: React.Dispatch<React.SetStateAction<string[]>>
}
type BookmarkToggleProps = SessionProps & {
    shopId: string
}

type GalleryProps = {
    photosUrls: string[]
    shopName: string
}

export function TagToggleList ({tagData, shopId, session}: Readonly<TagToggleListProps>) {
    const [activeTags, setActiveTags] = useState(new Array<string>())
    const effect = () => {
        fetchActiveTags(shopId, setActiveTags, session).then()
    }

    useEffect(effect, [setActiveTags, shopId])

    const brewingTags = {
        group: 'Brewing',
        tags: tagData?.filter((tag: Tag) => tag.tagGroup === 'brewing')
    }
    const busyTags = {
        group: 'Busy Times',
        tags: tagData?.filter((tag: Tag) => tag.tagGroup === 'busy')
    }
    const serviceTags = {
        group: 'Service',
        tags: tagData?.filter((tag: Tag) => tag.tagGroup === 'service')
    }

    return (
        <>
            <div className={'block md:hidden'}>
                <TagToggleGroup group={brewingTags} shopId={shopId} session={session} activeTags={activeTags}
                                activeTagsSetter={setActiveTags} startChecked/>
                <TagToggleGroup group={busyTags} shopId={shopId} session={session} activeTags={activeTags}
                                activeTagsSetter={setActiveTags}/>
                <TagToggleGroup group={serviceTags} shopId={shopId} session={session} activeTags={activeTags}
                                activeTagsSetter={setActiveTags}/>
            </div>
            <div className={'hidden md:block'}>
                <TagToggleGroup group={brewingTags} shopId={shopId} session={session} activeTags={activeTags}
                                activeTagsSetter={setActiveTags} startChecked/>
                <TagToggleGroup group={busyTags} shopId={shopId} session={session} activeTags={activeTags}
                                activeTagsSetter={setActiveTags} startChecked/>
                <TagToggleGroup group={serviceTags} shopId={shopId} session={session} activeTags={activeTags}
                                activeTagsSetter={setActiveTags} startChecked/>
            </div>
        </>
    )
}


export function TagToggleGroup ({group, shopId, session, activeTags, startChecked, activeTagsSetter}: Readonly<TagToggleGroupProps>) {


    const handleTagButtonChanged = (event: any) => {
        if (session) {
            const isChecked = event.currentTarget.checked
            const tagId = event.target.id

            const body = JSON.stringify({
                activeTagAccountId: null,
                activeTagShopId: shopId,
                activeTagTagId: tagId
            })

            if (!isChecked) {
                const requestHeaders = requestDeleteHeaders(body, session)
                fetch('/apis/activeTag', requestHeaders).then(() => {
                        fetchActiveTags(shopId, activeTagsSetter, session).then()
                    }
                )
            } else {
                const requestHeaders = requestPostHeaders(body, session)
                fetch('/apis/activeTag', requestHeaders).then(() => {
                        fetchActiveTags(shopId, activeTagsSetter, session).then()
                    }
                )
            }
        }
    }

    return (
        <div className={'collapse collapse-arrow'}>
            <input type={'checkbox'} name={'filter-accordion'} className={'min-w-full'}
                   defaultChecked={startChecked ?? false}/>
            <div className={'collapse-title text-xl font-medium'}>
                <div className={'divider'}>{group.group}</div>
            </div>
            <div className={'collapse-content'}>
                <div className={'flex flex-wrap gap-6 justify-around'}>
                    {group?.tags
                        ?.toSorted((a: Tag, b: Tag) => b.count - a.count)
                        .map((tag: Tag) => <TagButton tag={tag} key={tag.tagId}
                                                      checked={activeTags?.includes(tag.tagId) ?? false}
                                                      handleChanged={handleTagButtonChanged}/>)}
                </div>
            </div>
        </div>
    )
}

export function BookmarkToggle ({session, shopId}: BookmarkToggleProps) {
    const [bookmarks, setBookmarks] = useState(Array<object>())

    const getRequestHeaders = requestGetHeaders(session)
    const fetchBookmarks = () => {
        fetch('/apis/bookmark', getRequestHeaders)
            .then(response => response.json())
            .then((body) => {
                setBookmarks(body.data)
            })
    }

    const handleBookmarkToggleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (session) {
            const body = {
                bookmarkAccountId: null,
                bookmarkShopId: shopId,
                bookmarkOrder: bookmarks.length
            }
            const headers = event.target.checked ? requestPostHeaders(JSON.stringify(body), session) : requestDeleteHeaders(JSON.stringify(body), session)
            fetch('/apis/bookmark', headers)
                .then(response => {
                    if (response.ok) {
                        fetchBookmarks()
                    }
                })
        } else {
            event.preventDefault()
            console.log('Need to be signed in to bookmark')
        }
    }

    useEffect(fetchBookmarks, [setBookmarks])

    return <input type={'checkbox'} aria-label={'Bookmark'} className={'btn'}
                  checked={bookmarks.filter((shop: any) => shop.shopId === shopId).length > 0}
                  onChange={handleBookmarkToggleChanged} style={{backgroundImage: 'none'}}/>
}


async function fetchActiveTags (shopId: string, activeTagsSetter: React.Dispatch<React.SetStateAction<string[]>>, session?: Session) {
    const headers = requestGetHeaders(session)
    const url = `/apis/activeTag/activeTagsByShopId/${shopId}`
    fetch(url, headers)
        .then(response => response.json())
        .then((body) => {
            activeTagsSetter(body.data)
        })
}

export async function GalleryModal ({photosUrls, shopName}: Readonly<GalleryProps>) {
    return (
        <Modal id={'images_modal'}>
            <div className={'grid grid-rows-1 gap-4 justify-center'}>
                {photosUrls.map((photoDetails: any) => {
                    return <ShopDetailImage key={photoDetails.photoId} imageUrl={photoDetails.photoUrl}
                                            imageAlt={`Photograph of ${shopName}`}/>
                })}
            </div>
            <ModalActions>
                <button className={"btn btn-sm btn-circle btn-ghost absolute right-2 top-2"}>✕</button>
            </ModalActions>
        </Modal>
    )
}

export function GalleryModalButton () {
    return (
        <button className={"btn self-center"}
                onClick={() => (document.getElementById('images_modal') as HTMLDialogElement).showModal()}><img
            src={'/photo_icon.svg'} alt={'Image Photo From Google Fonts'}/>Image Gallery
        </button>
    )
}

function ShopDetailImage ({imageUrl, imageAlt}: Readonly<ImageProps>) {
    return (
        <img src={imageUrl} alt={imageAlt} className={'w-auto h-auto'}/>
    )

}