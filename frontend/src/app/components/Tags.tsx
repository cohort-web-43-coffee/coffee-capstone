import React from 'react'

type Tag = { label: string, count: number }
type TagGroup = { group: string, tags: Tag[] }
type TagProps = {
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
                .map((tag: Tag) => <TagButton tag={tag} showCount={showCounts}/>)}
        </div>
    </>
}

function TagButton (props: TagProps) {
    const {showCount} = props
    const {count, label} = props.tag
    const formatted = formattedLabel(label, count, showCount)
    return <button className={'btn btn-primary btn-xs md:btn-sm lg:btn-md'}>{formatted}</button>
}

function formattedLabel (label: string, count: number, showCount?: boolean) {
    return showCount ? <>#{label} <em>{count}</em></> : <>#{label}</>
}