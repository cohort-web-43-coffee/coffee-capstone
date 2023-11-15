import {ActiveTagSchema} from './active_tag.validator'
import {z} from 'zod'
import {sql} from '../../utils/database.utils'



export type ActiveTag = z.infer<typeof ActiveTagSchema>

/**
 * inserts an active tag into accountId and shopId tag
 * @param activeTag
 * @returns 'Insert active tag successful.'
 */
export async function insertActiveTag(activeTag: ActiveTag): Promise<string> {
    const {activeTagAccountId   , activeTagTagId, activeTagShopId} = activeTag

    await sql`INSERT INTO active_tag (active_tag_tag_id, active_tag_shop_id, active_tag_account_id) VALUES (${activeTagTagId}, ${activeTagShopId}, ${activeTagAccountId})`

    return 'Insert active tag successful.'
}


/**
 * deletes an active tag from the table
 * @param activeTag
 * @returns 'Delete active tag successful.'
 */

export async function deleteActiveTag(activeTag: ActiveTag): Promise<string> {
    const {activeTagAccountId, activeTagTagId, activeTagShopId} = activeTag

    await sql`DELETE
              FROM active_tag
              WHERE active_tag_tag_id = ${activeTagTagId}
                AND active_tag_account_id = ${activeTagAccountId}
                AND active_tag_shop_id = ${activeTagShopId}`

    return 'Delete active tag successful.'
}


/**
 * selects the active tags by account id
 * @param accountId
 * @return activeTagSchema
 */
export async function selectActiveTagsByAccountId(accountId: string): Promise<ActiveTag[]> {
    const rows = await sql`SELECT active_tag_tag_id, active_tag_shop_id, active_tag_account_id FROM active_tag WHERE active_tag_account_id = ${accountId}`
    return ActiveTagSchema.array().parse(rows)
}


/**
 * selects the active tags by shop id
 * @param accountId
 * @param shopId
 * @return an array of active tags
 */

export async function selectActiveTagsByAccountAndShopId(accountId: string, shopId: string): Promise<ActiveTag[]> {
    const rows = await sql`SELECT active_tag_tag_id, active_tag_shop_id, active_tag_account_id FROM active_tag WHERE active_tag_shop_id = ${shopId} AND active_tag_account_id = ${accountId}`
    return ActiveTagSchema.array().parse(rows)
}

/**
 * turns active tags into rows with tag id
 * @param tagId
 * @return array starting with 0 (?)
 */
export async function countActiveTagByTagId(tagId: string): Promise<number> {
    const result = await sql`SELECT COUNT(active_tag_tag_id) FROM active_tag WHERE active_tag_tag_id = ${tagId}`
    return result[0].count
}

/**
 * counts the active tags from the tables and puts it into columns
 * @param tagId
 * @param shopId
 */
export async function countActiveTagByTagIdAndShopId(tagId: string, shopId: string): Promise<number> {
    const result = await sql`SELECT COUNT(active_tag_tag_id)
                             FROM active_tag
                             WHERE active_tag_tag_id = ${tagId}
                               AND active_tag_shop_id = ${shopId}`
    return result[0].count
}