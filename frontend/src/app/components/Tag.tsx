'use client'

import {OptionalChildProps} from '@/app/types/Props'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'

type Tag = { tagLabel: string, count: number, tagId: string }
type TagGroup = { group: string, tags: Tag[] }

type TagButtonProps = {
    key: string,
    tag: Tag,
    showCount?: boolean,
    defaultChecked?: boolean,
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
                <div className="collapse-content">
                    <div className={'flex flex-wrap gap-6 justify-around'}>
                        {group.tags
                            .sort((a: Tag, b: Tag) => b.count - a.count)
                            .map((tag: Tag) => <TagButton tag={tag} defaultChecked={activeTags?.has(tag.tagId)} showCount={showCounts} key={tag.tagId}
                                                          handleChanged={handleTagButtonChanged}/>)}
                    </div>
                </div>
            </details>


        </>
    )
}

function TagButton ({showCount, tag, handleChanged, defaultChecked}: TagButtonProps) {
    const {tagLabel, count} = tag
    const formattedLabel = formatTagButtonLabel(tagLabel, count, showCount)
    return <input type={'checkbox'} id={tag.tagId} key={tag.tagId} onChange={handleChanged} aria-label={formattedLabel}
                  defaultChecked={defaultChecked} className={"btn bg-primary-unchecked btn-xs md:btn-sm lg:btn-md"} style={{backgroundImage: 'none'}}/>
}

function formatTagButtonLabel (label: string, count: number, showCount?: boolean) {
    return showCount && count != undefined ? `#${label} ${count}` : `#${label}`
}