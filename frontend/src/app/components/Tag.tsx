'use client'

import React, {useEffect, useState} from 'react'
import {OptionalChildProps} from '@/app/types/Props'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {tag} from 'postcss-selector-parser'

type Tag = { tagLabel: string, count: number, tagId: string }
type TagGroup = { group: string, tags: Tag[] }
type TagCheckedChangedProps = {
    tagCheckedChanged: (tagId: string, isChecked: boolean) => void
}
type TagButtonProps = TagCheckedChangedProps & {
    key: string,
    tag: Tag,
    showCount?: boolean
}
type TagGroupProps = OptionalChildProps & {
    showCounts?: boolean,
    group: TagGroup,
    activeTags: Set<string>
}

export function TagList ({group, showCounts, children, activeTags}: TagGroupProps) {
    const router = useRouter()
    const pathName = usePathname()
    const currentParams = useSearchParams()

    const onCheckedChanged = (tagId: string, isChecked: boolean): void => {
        const newParams = new URLSearchParams(currentParams)
        let newTagSet: Set<string>
        if (isChecked) {
            newTagSet = activeTags.add(tagId)
        } else {
            activeTags.delete(tagId)
            newTagSet = new Set(activeTags)
        }
        newParams.set('tags', Array.from(newTagSet).join(','))
        router.push(`${pathName}?${newParams.toString()}`)
    }

    return (
        <>
            <div className={'divider'}>{group.group}{children}</div>
            <div className={'flex flex-wrap gap-6 justify-around'}>
                {group.tags
                    .sort((a: Tag, b: Tag) => b.count - a.count)
                    .map((tag: Tag) => <TagButton tag={tag} showCount={showCounts} key={tag.tagId}
                                                  tagCheckedChanged={onCheckedChanged}/>)}
            </div>
        </>)
}

function TagButton ({showCount, tag, tagCheckedChanged}: TagButtonProps) {
    const {tagLabel, count} = tag
    const formattedLabel = formatTagButtonLabel(tagLabel, count, showCount)
    const handleCheckedChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        tagCheckedChanged(tag.tagId, event.currentTarget.checked)
    }
    return <input type="checkbox" key={tag.tagId} onChange={handleCheckedChanged} aria-label={formattedLabel}
                  className="btn bg-primary-unchecked btn-xs md:btn-sm lg:btn-md" style={{backgroundImage: 'none'}}/>
}

function formatTagButtonLabel (label: string, count: number, showCount?: boolean) {
    return showCount && count != undefined ? `#${label} ${count}` : `#${label}`
}