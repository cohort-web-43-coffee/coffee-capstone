'use client'

import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {Tag, TagButton, TagGroup} from '@/components/Tag'
import React from 'react';


type TagFilterListProps = {
    showCounts?: boolean,
    group: TagGroup,
    activeTags: Set<string>,
    startChecked?: boolean
}

export function TagFilterList ({group, showCounts, activeTags, startChecked}: Readonly<TagFilterListProps>) {
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
        <div className={'collapse collapse-arrow'}>
            <input type={'checkbox'} name={'filter-accordion'} className={'min-w-full'} defaultChecked={startChecked ?? false}/>
            <div className={'collapse-title text-xl font-medium'}>
                <div className={'divider'}>{group.group}</div>
            </div>
            <div className={'collapse-content flex flex-wrap gap-6 justify-around'}>
                {group.tags
                    .toSorted((a: Tag, b: Tag) => b.count - a.count)
                    .map((tag: Tag) => <TagButton tag={tag} key={tag.tagId} checked={activeTags?.has(tag.tagId)}
                                                  showCount={showCounts}
                                                  handleChanged={handleTagButtonChanged}/>)
                }
            </div>
        </div>
    )
}