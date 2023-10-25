import {ActiveTagSchema} from './active_tag.validator'
import {z} from 'zod'
import {sql} from '../../utils/database.utils'

const accountIdColumn = 'active_tag_account_id'

const shopIdColumn = 'active_tag_shop_id'

const tagIdColumn = 'active_tag_tag_id'

const columns = `${tagIdColumn}, ${shopIdColumn}, ${accountIdColumn}`


const idColumns = `${tagIdColumn}, ${shopIdColumn}, ${accountIdColumn}`


export type ActiveTag = z.infer<typeof ActiveTagSchema>


/**
 * inserts an active tag into accountId and shopId tag
 * @param activeTag
 * @returns 'Insert active tag successful.'
 */
export async function insertActiveTag(activeTag: ActiveTag): Promise<string> {
    const {activeTagAccountId, activeTagTagId, activeTagShopId} = activeTag

    await sql`INSERT INTO active_tag (active_tag_tag_id, active_tag_shop_id, active_tag_account_id) VALUES (${activeTagTagId}, ${activeTagShopId}, ${activeTagAccountId})`

    return 'Insert active tag successful.'
}


/**
 * deletes an active tag from the table
 * @param activeTag
 * @returns 'Delete active tag successful.'
 */

export async function deleteActiveTag(activeTag: ActiveTag): Promise<string> {
    const {activeTagTagId, activeTagAccountId, activeTagShopId} = activeTag

    await sql`DELETE
              FROM active_tag
              WHERE ${tagIdColumn} = ${activeTagTagId}
                AND ${accountIdColumn} = ${activeTagAccountId}
                AND ${shopIdColumn} = ${activeTagShopId}`

    return 'Delete active tag successful.'
}


/**
 * selects the active tags by account id
 * @param accountId
 * @return activeTagSchema
 */
export async function selectActiveTagsByAccountId(accountId: string): Promise<ActiveTag[]> {
    const rows = await sql`SELECT ${columns} FROM active_tag WHERE ${accountIdColumn} = ${accountId}`
    return ActiveTagSchema.array().parse(rows)
}


/**
 * selects the active tags by shop id
 * @param shopId
 * @return an array of active tags
 */

export async function selectActiveTagsByShopId(shopId: string): Promise<ActiveTag[]> {
    const rows = await sql`SELECT ${columns} FROM active_tag WHERE ${shopIdColumn} = ${shopId}`
    return ActiveTagSchema.array().parse(rows)
}

/**
 * turns active tags into rows with tag id
 * @param tagId
 * @return array starting with 0 (?)
 */
export async function countActiveTagByTagId(tagId: string): Promise<number> {
    const result = await sql`SELECT COUNT(active_tag_tag_id) FROM active_tag WHERE ${tagIdColumn} = ${tagId}`
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
                             WHERE ${tagIdColumn} = ${tagId}
                               AND ${shopIdColumn} = ${shopId}`
    return result[0].count
}