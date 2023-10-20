import {ActiveTagSchema} from './active_tag.validator'
import {z} from 'zod'
import {sql} from '../../utils/database.utils'

export type ActiveTag = z.infer<typeof ActiveTagSchema>

export async function insertActiveTag(activeTag: ActiveTag) {
    let {tagId, accountId, shopId} = activeTag

    await sql`INSERT INTO active_tag (tag_id, account_id, shop_id)
              VALUES ${tagId}, ${accountId}, ${shopId}`

    return 'Insert active tag successful.'
}