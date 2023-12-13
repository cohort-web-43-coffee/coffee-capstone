'use client'
import {Tag, TagButton, TagGroup} from '@/components/Tag'
import {requestDeleteHeaders, requestGetHeaders, requestPostHeaders} from '@/utils/fetchHeaders'
import {Session} from '@/utils/fetchSession'
import React, {useEffect, useState} from 'react'
import {SessionProps} from "@/types/Props"
import {BookmarkAddedSVG, BookmarkAddSVG} from '@/components/SVG'

type TagsSetter = React.Dispatch<React.SetStateAction<Tag[]>>
type ActiveTagsSetter = React.Dispatch<React.SetStateAction<string[]>>
type TagToggleListProps = SessionProps & {
    shopId: string
}
type TagToggleGroupProps = SessionProps & {
    group: TagGroup,
    shopId: string,
    activeTags: string[],
    startChecked?: boolean
    activeTagsSetter: ActiveTagsSetter
    tagsSetter: TagsSetter
}
type BookmarkToggleProps = SessionProps & {
    shopId: string
}

export function TagToggleList ({shopId, session}: Readonly<TagToggleListProps>) {
    const [activeTags, setActiveTags] = useState(new Array<string>())
    const [tags, setTags] = useState(new Array<Tag>())


    const fetchActiveTagsEffect = () => {
        fetchActiveTags(shopId, setActiveTags, session).then()
    }

    const fetchTagsEffect = () => {
        fetchTags(shopId, setTags).then()
    }

    useEffect(fetchActiveTagsEffect, [shopId, session])
    useEffect(fetchTagsEffect, [shopId])

    const brewingTags = {
        group: 'Brewing',
        tags: tags.filter((tag: Tag) => tag.tagGroup === 'brewing')
    }
    const busyTags = {
        group: 'Busy Times',
        tags: tags.filter((tag: Tag) => tag.tagGroup === 'busy')
    }
    const serviceTags = {
        group: 'Service',
        tags: tags.filter((tag: Tag) => tag.tagGroup === 'service')
    }

    return (
        <>
            <div className={'block md:hidden'}>
                <TagToggleGroup
                    group={brewingTags} shopId={shopId} session={session} activeTags={activeTags}
                    activeTagsSetter={setActiveTags} tagsSetter={setTags} startChecked/>
                <TagToggleGroup
                    group={busyTags} shopId={shopId} session={session} activeTags={activeTags}
                    activeTagsSetter={setActiveTags} tagsSetter={setTags}/>
                <TagToggleGroup
                    group={serviceTags} shopId={shopId} session={session} activeTags={activeTags}
                    activeTagsSetter={setActiveTags} tagsSetter={setTags}/>
            </div>
            <div className={'hidden md:block'}>
                <TagToggleGroup
                    group={brewingTags} shopId={shopId} session={session} activeTags={activeTags}
                    activeTagsSetter={setActiveTags} startChecked tagsSetter={setTags}/>
                <TagToggleGroup
                    group={busyTags} shopId={shopId} session={session} activeTags={activeTags}
                    activeTagsSetter={setActiveTags} startChecked tagsSetter={setTags}/>
                <TagToggleGroup
                    group={serviceTags} shopId={shopId} session={session} activeTags={activeTags}
                    activeTagsSetter={setActiveTags} startChecked tagsSetter={setTags}/>
            </div>
        </>
    )
}


export function TagToggleGroup ({group, shopId, session, activeTags, startChecked, activeTagsSetter, tagsSetter}: Readonly<TagToggleGroupProps>) {
    const handleChanged = makeToggleChangedHandler(shopId, activeTagsSetter, tagsSetter, session)

    return (
        <div className={'collapse collapse-arrow'}>
            <input
                type={'checkbox'} name={'filter-accordion'} className={'min-w-full'}
                defaultChecked={startChecked ?? false}/>
            <div className={'collapse-title text-xl font-medium'}>
                <div className={'divider'}>{group.group}</div>
            </div>
            <div className={'collapse-content'}>
                <div className={'flex flex-wrap gap-4 justify-around'}>
                    {group?.tags?.map((tag: Tag) =>
                        <TagButton
                            showCount
                            tag={tag}
                            key={tag.tagId}
                            checked={activeTags?.includes(tag.tagId) ?? false}
                            handleChanged={handleChanged}/>)}
                </div>
            </div>
        </div>
    )
}

function makeToggleChangedHandler (shopId: string, activeTagsSetter: ActiveTagsSetter, tagSetter: TagsSetter, session: Session | undefined) {
    return (event: any) => {
        if (session) {
            const isChecked = event.currentTarget.checked
            const tagId = event.target.id

            const body = {
                activeTagAccountId: null,
                activeTagShopId: shopId,
                activeTagTagId: tagId
            }

            if (!isChecked) {
                const requestHeaders = requestDeleteHeaders(body, session)
                fetch('/apis/activeTag', requestHeaders).then(() => {
                        fetchActiveTags(shopId, activeTagsSetter, session).then()
                        fetchTags(shopId, tagSetter).then()
                    }
                )
            } else {
                const requestHeaders = requestPostHeaders(body, session)
                fetch('/apis/activeTag', requestHeaders).then(() => {
                        fetchActiveTags(shopId, activeTagsSetter, session).then()
                        fetchTags(shopId, tagSetter).then()
                    }
                )
            }
        }
    }
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
                bookmarkOrder: bookmarks?.length ?? 1
            }
            const headers = event.target.checked ? requestPostHeaders(body, session) : requestDeleteHeaders(body, session)
            fetch('/apis/bookmark', headers)
                .then(response => {
                    if (response.ok) {
                        fetchBookmarks()
                    }
                })
        } else {
            event.preventDefault()
            console.error('Need to be signed in to bookmark')
        }
    }

    useEffect(fetchBookmarks, [setBookmarks])

    return (
        <label className={`swap swap-flip w-[36px] h-[36px]`}>
            <input
                type={'checkbox'}
                aria-label={'Bookmark'}
                checked={bookmarks?.filter((shop: any) => shop.shopId === shopId).length > 0}
                onChange={handleBookmarkToggleChanged}
                className={'hidden'}
            />
            <BookmarkAddSVG className={'swap-off fill-primary'}/>
            <BookmarkAddedSVG className={'swap-on fill-primary'}/>
        </label>
    )
}
async function fetchActiveTags (shopId: string, activeTagsSetter: ActiveTagsSetter, session?: Session) {
    const headers = requestGetHeaders(session)
    const url = `/apis/activeTag/shop/${shopId}`
    fetch(url, headers)
        .then(response => response.json())
        .then((body) => {
            activeTagsSetter(body.data)
        })
}


async function fetchTags (shopId: string, tagsSetter: TagsSetter) {
    const headers = requestGetHeaders()
    const url = `/apis/tag/shop/${shopId}`
    fetch(url, headers)
        .then(response => response.json())
        .then(body => {
            tagsSetter(body.data)
        })
}