import React from 'react'

type Tag = { label: string, count: number, id: string }
type TagGroup = { group: string, tags: Tag[] }
type TagButtonProps = {
    key: string,
    tag: Tag,
    showCount?: boolean
}
type TagGroupProps = {
    showCounts?: boolean,
    group: TagGroup,
    children?: any
}

export function TagList (props: TagGroupProps) {
    const {group, showCounts, children} = props
    return <>
        <div className={'divider'}>{group.group}{children}</div>
        <div className={'flex flex-wrap gap-6 justify-around'}>
            {group.tags
                .sort((a: Tag, b: Tag) => b.count - a.count)
                .map((tag: Tag) => <TagButton tag={tag} showCount={showCounts} key={tag.id}/>)}
        </div>
    </>
}

function TagButton (props: TagButtonProps) {
    const {showCount} = props
    const {count, label} = props.tag
    const formattedLabel = formatLabel(label, count, showCount)
    return <input type='checkbox' aria-label={formattedLabel} className='btn bg-primary-unchecked btn-xs md:btn-sm lg:btn-md' style={{backgroundImage: 'none'}}/>
}

function formatLabel (label: string, count: number, showCount?: boolean) {
    return showCount ? `#${label} ${count}` : `#${label}`
}