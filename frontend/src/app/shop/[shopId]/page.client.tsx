'use client'

import {OptionalChildProps} from '@/app/types/Props'
import {Tag, TagButton, TagGroup} from '@/app/components/Tag'
import {requestDeleteHeaders, requestGetHeaders, requestPostHeaders} from '@/app/utils/fetch'
import {Session} from '@/utils/fetchSession'

type TagToggleListProps = OptionalChildProps & {
    group: TagGroup,
    shopId: string,
    session: Session,
    accountActiveTags?: Tag[]
}

export function TagToggleList ({children, group, shopId, session, accountActiveTags}: TagToggleListProps) {
    const headers = requestGetHeaders(session)
    fetch(`${process.env.PUBLIC_API_URL}//apis/activeTag/activeTagsByShopId/${shopId}`).then(response => console.log(response))
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
                    .map((tag: Tag) => <TagButton showCount tag={tag} key={tag.tagId} defaultChecked={accountActiveTags?.map(tag => tag.tagId)?.includes(tag.tagId)}
                                                  handleChanged={handleTagButtonChanged}/>)}
            </div>
        </>
    )
}