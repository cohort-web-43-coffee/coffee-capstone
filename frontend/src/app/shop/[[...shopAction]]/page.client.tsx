'use client'

import {OptionalChildProps} from '@/app/types/Props'
import {Tag, TagButton, TagGroup} from '@/app/components/Tag'
import {useRouter} from 'next/navigation'

type TagToggleListProps = OptionalChildProps & {
    group: TagGroup,
    shopId: string
}

export function TagToggleList ({children, group, shopId}: TagToggleListProps) {
    const router = useRouter()
    const handleTagButtonChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.currentTarget.checked
        const tagId = event.currentTarget.id

        if (isChecked) (
            router.push(`/shop/${shopId}/${tagId}/add`)
        )
        else {
            router.push(`/shop/${shopId}/${tagId}/remove`)
        }
    }

    return (
        <>
            <div className={'divider'}>{group.group}{children}</div>
            <div className={'flex flex-wrap gap-6 justify-around'}>
                {group.tags
                    .sort((a: Tag, b: Tag) => b.count - a.count)
                    .map((tag: Tag) => <TagButton showCount tag={tag} key={tag.tagId}
                                                  handleChanged={handleTagButtonChanged}/>)}
            </div>
        </>
    )
}