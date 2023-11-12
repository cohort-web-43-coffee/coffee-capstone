'use client'

import {OptionalChildProps} from '@/app/types/Props'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'

type Tag = { tagLabel: string, count: number, tagId: string }
type TagGroup = { group: string, tags: Tag[] }

type TagButtonProps = {
    key: string,
    tag: Tag,
    showCount?: boolean,
    handleChanged: (event: React.ChangeEvent<HTMLInputElement>) => void
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

    const handleTagButtonChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('Changed id:', event.currentTarget.id, 'is checked:', event.currentTarget.checked)

        const newParams = new URLSearchParams(currentParams)
        const tagId = event.currentTarget.id
        let newTagSet: Set<string> = new Set<string>(activeTags)
        console.log('set', newTagSet)
        if (event.target.checked) {
            newTagSet = newTagSet.add(tagId)
        } else {
            newTagSet.delete(tagId)
        }

        // console.log('previousSet:', JSON.stringify(activeTags), 'new set:', JSON.stringify(newTagSet))
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
                                                  handleChanged={handleTagButtonChanged}/>)}
            </div>
        </>)
}

function TagButton ({showCount, tag, handleChanged}: TagButtonProps) {
    const {tagLabel, count} = tag
    const formattedLabel = formatTagButtonLabel(tagLabel, count, showCount)

    return <input type="checkbox" id={tag.tagId} key={tag.tagId} onChange={handleChanged} aria-label={formattedLabel}
                  className="btn bg-primary-unchecked btn-xs md:btn-sm lg:btn-md" style={{backgroundImage: 'none'}}/>
}

function formatTagButtonLabel (label: string, count: number, showCount?: boolean) {
    return showCount && count != undefined ? `#${label} ${count}` : `#${label}`
}