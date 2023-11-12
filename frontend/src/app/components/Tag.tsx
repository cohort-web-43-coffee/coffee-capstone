'use client'

export type Tag = { tagLabel: string, count: number, tagId: string }
export type TagGroup = { group: string, tags: Tag[] }

type TagButtonProps = {
    key: string,
    tag: Tag,
    showCount?: boolean,
    defaultChecked?: boolean,
    handleChanged: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function TagButton ({showCount, tag, handleChanged, defaultChecked}: TagButtonProps) {
    const {tagLabel, count} = tag
    const formattedLabel = formatTagButtonLabel(tagLabel, count, showCount)

    return <input type={'checkbox'} id={tag.tagId} key={tag.tagId} onChange={handleChanged} aria-label={formattedLabel}
                  defaultChecked={defaultChecked} className="btn bg-primary-unchecked btn-xs md:btn-sm lg:btn-md" style={{backgroundImage: 'none'}}/>
}

function formatTagButtonLabel (label: string, count: number, showCount?: boolean) {
    return showCount && count != undefined ? `#${label} ${count}` : `#${label}`
}