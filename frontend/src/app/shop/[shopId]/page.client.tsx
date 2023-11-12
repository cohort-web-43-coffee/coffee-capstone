'use client'

import {OptionalChildProps} from '@/app/types/Props'
import {Tag, TagButton, TagGroup} from '@/app/components/Tag'

type TagToggleListProps = OptionalChildProps & {
    group: TagGroup
}
export function TagToggleList({children, group} : TagToggleListProps) {

    const handleTagButtonChanged = (event: React.ChangeEvent<HTMLInputElement>) => {}

    return (
        <>
            <div className={'divider'}>{group.group}{children}</div>
            <div className={'flex flex-wrap gap-6 justify-around'}>
                {group.tags
                    .sort((a: Tag, b: Tag) => b.count - a.count)
                    .map((tag: Tag) => <TagButton showCount tag={tag} key={tag.tagId} handleChanged={handleTagButtonChanged}/>)}
            </div>
        </>
    )
}