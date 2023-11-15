'use client'

import {OptionalChildProps} from '@/app/types/Props'
import {Tag, TagButton, TagGroup} from '@/app/components/Tag'
import {requestDeleteHeaders, requestGetHeaders, requestPostHeaders} from '@/app/utils/fetch'
import {Session} from '@/utils/fetchSession'
import React, {useEffect, useState} from 'react'

type TagToggleListProps = OptionalChildProps & {
    group: TagGroup,
    shopId: string,
    session?: Session,
    activeTags: string[]
}

export function TagToggleList ({tagData, shopId, session}: { tagData: any, shopId: string, session: Session }) {
    const [activeTags, setActiveTags] = useState(new Array<string>())
    const effect = () => {
        const headers = requestGetHeaders(session)
        const url = `/apis/activeTag/activeTagsByShopId/${shopId}`
        fetch(url, headers)
            .then(response => response.json())
            .then((body) => {
                setActiveTags(body.data)
            })
    }

    console.log(activeTags)

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
    return (<>
            <TagToggleGroup group={brewingTags} shopId={shopId} session={session} activeTags={activeTags} setActiveTags={setActiveTags}/>
            <TagToggleGroup group={serviceTags} shopId={shopId} session={session} activeTags={activeTags} setActiveTags={setActiveTags}/>
            <TagToggleGroup group={busyTags} shopId={shopId} session={session} activeTags={activeTags} setActiveTags={setActiveTags}/>
        </>
    )
}

export function TagToggleGroup ({group, shopId, session, activeTags}: TagToggleListProps) {

    const handleTagButtonChanged = (event: any) => {
        const isChecked = event.currentTarget.checked
        const tagId = event.currentTarget.id
        const body = JSON.stringify({
            accountId: null,
            shopId,
            tagId
        })
        const requestHeaders = isChecked ? requestPostHeaders(body, session) : requestDeleteHeaders(body, session)
        fetch('/apis/activeTag', requestHeaders).then()
    }
    console.log('Group activeTags:', activeTags)
    return (
        <>
            <div className={'divider'}>{group.group}</div>
            <div className={'flex flex-wrap gap-6 justify-around'}>
                {group.tags
                    .sort((a: Tag, b: Tag) => b.count - a.count)
                    .map((tag: Tag) => <TagButton showCount tag={tag} key={tag.tagId}
                                                  defaultChecked={activeTags.includes(tag.tagId)}
                                                  handleChanged={handleTagButtonChanged}/>)}
            </div>
        </>
    )
}