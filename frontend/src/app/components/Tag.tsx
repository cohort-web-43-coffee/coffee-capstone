'use client'

import React, {useEffect, useState} from 'react'
import {OptionalChildProps} from '@/app/types/Props'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'

type Tag = { label: string, count: number, id: string }
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
    group: TagGroup
}

export function TagList ({group, showCounts, children}: TagGroupProps) {
    const [tagIds, setTagIds] = useState(new Set<string>())


    const onCheckedChanged = (tagId: string, isChecked: boolean) => {
        setTagIds((prevSet: Set<string>) => {
            if (isChecked) {
                return new Set(prevSet.add(tagId))
            } else {
                prevSet.delete(tagId)
                return new Set(prevSet)
            }
        })
    }
    const router = useRouter()
    const pathName = usePathname()
    const currentParams = useSearchParams()

    useEffect(() => {
        const params = new URLSearchParams(currentParams)
        params.set('tags', Array.from(tagIds).join(','))
        router.push(`${pathName}?${params.toString()}`)
    }, [tagIds, router, pathName, currentParams]);

    return <>
        <div className={'divider'}>{group.group}{children}</div>
        <div className={'flex flex-wrap gap-6 justify-around'}>
            {group.tags
                .sort((a: Tag, b: Tag) => b.count - a.count)
                .map((tag: Tag) => <TagButton tag={tag} showCount={showCounts} key={tag.id}
                                              tagCheckedChanged={onCheckedChanged}/>)}
        </div>
    </>
}

function TagButton ({showCount, tag, tagCheckedChanged}: TagButtonProps) {
    const {label, count} = tag
    const formattedLabel = formatTagButtonLabel(label, count, showCount)
    const handleCheckedChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        tagCheckedChanged(tag.id, event.currentTarget.checked)
    }
    return <input type="checkbox" key={tag.id} onChange={handleCheckedChanged} aria-label={formattedLabel}
                  className="btn bg-primary-unchecked btn-xs md:btn-sm lg:btn-md" style={{backgroundImage: 'none'}}/>
}

function formatTagButtonLabel (label: string, count: number, showCount?: boolean) {
    return showCount ? `#${label} ${count}` : `#${label}`
}