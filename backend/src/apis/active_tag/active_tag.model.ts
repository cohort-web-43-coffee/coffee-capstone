import {ActiveTagSchema} from './active_tag.validator'
import {z} from 'zod'
import {sql} from '../../utils/database.utils'

export type ActiveTag = z.infer<typeof ActiveTagSchema>

export async function insertActiveTag(activeTag: ActiveTag): Promise<string> {
    const {tagId, accountId, shopId} = activeTag

    await sql`INSERT INTO active_tag (tag_id, account_id, shop_id)
              VALUES ${tagId}, ${accountId}, ${shopId}`

    return 'Insert active tag successful.'
}

export async function deleteActiveTag(activeTag: ActiveTag): Promise<string> {
    const {tagId, accountId, shopId} = activeTag

    await sql`DELETE
              FROM active_tag
              WHERE tag_id = ${tagId}
                AND account_id = ${accountId}
                AND shop_id = ${shopId}`

    return 'Delete active tag successful.'
}

export async function selectActiveTagsByAccountId(accountId: string): Promise<ActiveTag[]> {
    const rows = await sql`SELECT account_id, shop_id, tag_id
                           FROM active_tag
                           WHERE account_id = ${accountId}`

    return ActiveTagSchema.array().parse(rows)
}

export async function selectActiveTagsByShopId(shopId: string): Promise<ActiveTag[]> {
    const rows = await sql`SELECT account_id, shop_id, tag_id
                           FROM active_tag
                           WHERE shop_id = ${shopId}`

    return ActiveTagSchema.array().parse(rows)
}

export async function countActiveTagByTagId(tagId: string): Promise<number> {
    const result = await sql`SELECT COUNT (tag_id) WHERE tag_id = ${tagId}`
    return result[0].count
}