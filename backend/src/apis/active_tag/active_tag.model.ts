import {ActiveTagSchema} from './active_tag.validator'
import {z} from 'zod'
import {sql} from '../../utils/database.utils'


export type ActiveTag = z.infer<typeof ActiveTagSchema>

export async function insertActiveTag(activeTag: ActiveTag): Promise<string> {
    const {activeTagAccountId   , activeTagTagId, activeTagShopId} = activeTag

    await sql`INSERT INTO active_tag (active_tag_tag_id, active_tag_shop_id, active_tag_account_id) VALUES (${activeTagTagId}, ${activeTagShopId}, ${activeTagAccountId})`

    return 'Insert active tag successful.'
}

export async function deleteActiveTag(activeTag: ActiveTag): Promise<string> {
    const {activeTagAccountId, activeTagTagId, activeTagShopId} = activeTag

    await sql`DELETE
              FROM active_tag
              WHERE active_tag_tag_id = ${activeTagTagId}
                AND active_tag_account_id = ${activeTagAccountId}
                AND active_tag_shop_id = ${activeTagShopId}`

    return 'Delete active tag successful.'
}

export async function selectActiveTagsByAccountAndShopId(accountId: string, shopId: string): Promise<ActiveTag[]> {
    const rows = await sql`SELECT active_tag_tag_id, active_tag_shop_id, active_tag_account_id FROM active_tag WHERE active_tag_shop_id = ${shopId} AND active_tag_account_id = ${accountId}`
    return ActiveTagSchema.array().parse(rows)
}