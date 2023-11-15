'use client'

export type Tag = { tagLabel: string, count: number, tagId: string }
export type TagGroup = { group: string, tags: Tag[] }

type TagButtonProps = {
    key: string,
    tag: Tag,
    showCount?: boolean,
    checked?: boolean,
    handleChanged: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function TagButton ({showCount, tag, handleChanged, checked}: TagButtonProps) {
    const {tagLabel, count} = tag
    const formattedLabel = formatTagButtonLabel(tagLabel, count, showCount)

    return <input type={'checkbox'} id={tag.tagId} key={tag.tagId} onChange={handleChanged} aria-label={formattedLabel}
                  checked={checked} className="btn bg-primary-unchecked btn-xs md:btn-sm lg:btn-md" style={{backgroundImage: 'none'}}/>
}

function formatTagButtonLabel (label: string, count: number, showCount?: boolean) {
    return showCount && count != undefined ? `#${label} ${count}` : `#${label}`
}