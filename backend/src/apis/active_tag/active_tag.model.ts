import {ActiveTagSchema} from './active_tag.validator'
import {z} from 'zod'
import {sql} from '../../utils/database.utils'

const accountIdColumn = 'active_tag_account_id'
const shopIdColumn = 'active_tag_shop_id'
const tagIdColumn = 'active_tag_tag_id'
const columns = `${tagIdColumn}, ${shopIdColumn}, ${accountIdColumn}`

export type ActiveTag = z.infer<typeof ActiveTagSchema>

export async function insertActiveTag(activeTag: ActiveTag): Promise<string> {
    const {activeTagAccountId, activeTagTagId, activeTagShopId} = activeTag

    await sql`INSERT INTO active_tag (active_tag_tag_id, active_tag_shop_id, active_tag_account_id) VALUES (${activeTagTagId}, ${activeTagShopId}, ${activeTagAccountId})`

    return 'Insert active tag successful.'
}

export async function deleteActiveTag(activeTag: ActiveTag): Promise<string> {
    const {activeTagTagId, activeTagAccountId, activeTagShopId} = activeTag

    await sql`DELETE
              FROM active_tag
              WHERE ${tagIdColumn} = ${activeTagTagId}
                AND ${accountIdColumn} = ${activeTagAccountId}
                AND ${shopIdColumn} = ${activeTagShopId}`

    return 'Delete active tag successful.'
}

export async function selectActiveTagsByAccountId(accountId: string): Promise<ActiveTag[]> {
    const rows = await sql`SELECT ${columns} FROM active_tag WHERE ${accountIdColumn} = ${accountId}`
    return ActiveTagSchema.array().parse(rows)
}

export async function selectActiveTagsByShopId(shopId: string): Promise<ActiveTag[]> {
    const rows = await sql`SELECT ${columns} FROM active_tag WHERE ${shopIdColumn} = ${shopId}`
    return ActiveTagSchema.array().parse(rows)
}

export async function countActiveTagByTagId(tagId: string): Promise<number> {
    const result = await sql`SELECT COUNT(active_tag_tag_id) FROM active_tag WHERE ${tagIdColumn} = ${tagId}`
    return result[0].count
}

export async function countActiveTagByTagIdAndShopId(tagId: string, shopId: string): Promise<number> {
    const result = await sql`SELECT COUNT(active_tag_tag_id)
                             FROM active_tag
                             WHERE ${tagIdColumn} = ${tagId}
                               AND ${shopIdColumn} = ${shopId}`
    return result[0].count
}