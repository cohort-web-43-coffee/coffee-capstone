'use client'

import {Tag, TagButton, TagGroup} from '@/app/components/Tag'
import {requestDeleteHeaders, requestGetHeaders, requestPostHeaders} from '@/app/utils/fetch'
import {Session} from '@/utils/fetchSession'
import React, {useEffect, useState} from 'react'


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

async function fetchActiveTags (shopId: String, activeTagsSetter: React.Dispatch<React.SetStateAction<string[]>>, session?: Session) {
    const headers = requestGetHeaders(session)
    const url = `/apis/activeTag/activeTagsByShopId/${shopId}`
    fetch(url, headers)
        .then(response => response.json())
        .then((body) => {
            activeTagsSetter(body.data)
        })
}

export function TagToggleList ({tagData, shopId, session}: TagToggleListProps) {
    const [activeTags, setActiveTags] = useState(new Array<string>())
    const effect = () => {
        fetchActiveTags(shopId, setActiveTags, session).then()
    }

    useEffect(effect, [setActiveTags, shopId])

    const brewingTags = {
        group: 'Brewing',
        tags: tagData.filter((tag: any) => tag.tagGroup === 'brewing')
    }
    const busyTags = {
        group: 'Busy Times',
        tags: tagData.filter((tag: any) => tag.tagGroup === 'busy')
    }
    const serviceTags = {
        group: 'Service',
        tags: tagData.filter((tag: any) => tag.tagGroup === 'service')
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

export function TagToggleGroup({group, shopId, session, activeTags, activeTagsSetter}: TagToggleGroupProps) {

    const handleTagButtonChanged = (event: any) => {
        if(session) {
            const isChecked = event.currentTarget.checked
            const tagId = event.target.id

            const body = JSON.stringify({
                activeTagAccountId: null,
                activeTagShopId: shopId,
                activeTagTagId: tagId
            })

            if (!isChecked) {
                const requestHeaders = requestDeleteHeaders(body, session)
                fetch('/apis/activeTag', requestHeaders).then(response => {
                        fetchActiveTags(shopId, activeTagsSetter, session).then()
                    }
                )
            } else {
                const requestHeaders = requestPostHeaders(body, session)
                fetch('/apis/activeTag', requestHeaders).then(response => {
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
                        {group.tags
                            .sort((a: Tag, b: Tag) => b.count - a.count)
                            .map((tag: Tag) => <TagButton tag={tag} key={tag.tagId}
                                                          checked={activeTags?.includes(tag.tagId) ?? false}
                                                          handleChanged={handleTagButtonChanged}/>)}
                    </div>
                </div>
            </details>
        </>
    )
}