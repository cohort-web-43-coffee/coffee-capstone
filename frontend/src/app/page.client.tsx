'use client'

import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {Tag, TagButton, TagGroup} from '@/app/components/Tag'
import {OptionalChildProps} from '@/app/types/Props'
import React from "react";


type TagFilterListProps = OptionalChildProps & {
    showCounts?: boolean,
    group: TagGroup,
    activeTags: Set<string>
}

export function TagFilterList({group, showCounts, children, activeTags}: TagFilterListProps) {
    const router = useRouter()
    const pathName = usePathname()
    const currentParams = useSearchParams()

    const handleTagButtonChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newParams = new URLSearchParams(currentParams)
        const tagId = event.currentTarget.id
        let newTagSet: Set<string> = new Set<string>(activeTags)

        if (event.target.checked) {
            newTagSet = newTagSet.add(tagId)
        } else {
            newTagSet.delete(tagId)
        }

        newParams.set('tags', Array.from(newTagSet).join(','))
        router.push(`${pathName}?${newParams.toString()}`)
    }

    return (
        <>
            <details className={"collapse collapse-arrow"}>
                <summary className={"collapse-title text-xl font-medium"}>
                    <div className={'divider'}>{group.group}{children}</div>
                </summary>
                <div className={"collapse-content"}>
                    <div className={'flex flex-wrap gap-6 justify-around'}>
                        {group.tags
                            .sort((a: Tag, b: Tag) => b.count - a.count)
                            .map((tag: Tag) => <TagButton tag={tag} checked={activeTags?.has(tag.tagId)}
                                                          showCount={showCounts} key={tag.tagId}
                                                          handleChanged={handleTagButtonChanged}/>)}
                    </div>
                </div>
            </details>
        </>
    )
}




