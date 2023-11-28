'use client'

import {Tag, TagButton, TagGroup} from '@/app/components/Tag'
import {requestDeleteHeaders, requestGetHeaders, requestPostHeaders} from '@/app/utils/fetch'
import {Session} from '@/utils/fetchSession'
import React, {useEffect, useState} from 'react'
import {SessionProps} from '@/app/types/Props'


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
    activeTagsSetter: React.Dispatch<React.SetStateAction<string[]>>
}
type BookmarkToggleProps = SessionProps & {
    shopId: string
}

export function TagToggleList ({tagData, shopId, session}: TagToggleListProps) {
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
            <TagToggleGroup group={brewingTags} shopId={shopId} session={session} activeTags={activeTags}
                            activeTagsSetter={setActiveTags}/>
            <TagToggleGroup group={busyTags} shopId={shopId} session={session} activeTags={activeTags}
                            activeTagsSetter={setActiveTags}/>
            <TagToggleGroup group={serviceTags} shopId={shopId} session={session} activeTags={activeTags}
                            activeTagsSetter={setActiveTags}/>
        </>
    )
}

export function TagToggleGroup ({group, shopId, session, activeTags, activeTagsSetter}: TagToggleGroupProps) {

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
        <>
            <details className={"collapse collapse-arrow"}>
                <summary className={"collapse-title text-xl font-medium"}>
                    <div className={'divider'}>{group.group}</div>
                </summary>
                <div className={"collapse-content"}>
                    <div className={'flex flex-wrap gap-6 justify-around'}>
                        {group?.tags
                            ?.sort((a: Tag, b: Tag) => b.count - a.count)
                            .map((tag: Tag) => <TagButton tag={tag} key={tag.tagId}
                                                          checked={activeTags?.includes(tag.tagId) ?? false}
                                                          handleChanged={handleTagButtonChanged}/>)}
                    </div>
                </div>
            </details>
        </>
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
                  checked={bookmarks?.filter((shop: any) => shop.shopId === shopId).length > 0 ?? false}
                  onChange={handleBookmarkToggleChanged} style={{backgroundImage: 'none'}}/>
}


async function fetchActiveTags (shopId: String, activeTagsSetter: React.Dispatch<React.SetStateAction<string[]>>, session?: Session) {
    const headers = requestGetHeaders(session)
    const url = `/apis/activeTag/activeTagsByShopId/${shopId}`
    fetch(url, headers)
        .then(response => response.json())
        .then((body) => activeTagsSetter(body.data))
}