'use client'

import {OptionalChildProps} from '@/app/types/Props'
import {Tag, TagButton, TagGroup} from '@/app/components/Tag'
import {requestDeleteHeaders, requestPostHeaders} from '@/app/utils/fetch'
import {Session} from '@/utils/fetchSession'

type TagToggleListProps = OptionalChildProps & {
    group: TagGroup,
    shopId: string,
    session: Session
}

export function TagToggleList ({children, group, shopId, session}: TagToggleListProps) {

    const handleTagButtonChanged = (event: any) => {
        const isChecked = event.currentTarget.checked
        const tagId = event.currentTarget.id
        const body = JSON.stringify({
            accountId: null,
            shopId,
            tagId
        })
        const request = isChecked ? requestPostHeaders(body, session) : requestDeleteHeaders(body, session)
        fetch('/apis/activeTag', request).then()
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