import React from 'react'
import {OptionalChildProps} from '@/app/types/Props'

type Tag = { label: string, count: number, id: string }
type TagGroup = { group: string, tags: Tag[] }
type TagButtonProps = {
    key: string,
    tag: Tag,
    showCount?: boolean
}
type TagGroupProps = OptionalChildProps & {
    showCounts?: boolean,
    group: TagGroup,
}

export function TagList ({group, showCounts, children}: TagGroupProps) {
    return <>
        <div className={'divider'}>{group.group}{children}</div>
        <div className={'flex flex-wrap gap-6 justify-around'}>
            {group.tags
                .sort((a: Tag, b: Tag) => b.count - a.count)
                .map((tag: Tag) => <TagButton tag={tag} showCount={showCounts} key={tag.id}/>)}
        </div>
    </>
}

function TagButton ({showCount, tag}: TagButtonProps) {
    const {label, count} = tag
    const formattedLabel = formatTagButtonLabel(label, count, showCount)
    return <input type="checkbox" aria-label={formattedLabel}
                  className="btn bg-primary-unchecked btn-xs md:btn-sm lg:btn-md" style={{backgroundImage: 'none'}}/>
}

function formatTagButtonLabel (label: string, count: number, showCount?: boolean) {
    return showCount ? `#${label} ${count}` : `#${label}`
}