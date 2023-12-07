import {ShopTagSchema, TagSchema} from "./tag.validator";
import {z} from "zod";
import {sql} from "../../utils/database.utils";


export type Tag = z.infer<typeof TagSchema>
export type ShopTag = z.infer<typeof ShopTagSchema>

export async function insertTag(tag: Tag): Promise<string> {
    const {tagGroup, tagLabel} = tag
    await sql `insert into tag (tag_id, tag_group, tag_label) values (gen_random_uuid(), ${tagGroup}, ${tagLabel})`
    return 'Tag created successfully! Go drink coffee'
}

export async function getAllTagsByTagGroup(tagGroup: string): Promise<Tag[]> {
    const rowList = <Tag[]>await sql `select tag_id, tag_group, tag_label from tag where tag_group = ${tagGroup}`
    return TagSchema.array().parse(rowList)
}

/**
 * Get a list of tags that have been added
 * @param shopId to be selected by tagLabel
 * @returns An array of tags with their tag_id, tag_group, and a count of the number of times the tag has been added.
 */
export async function getTagsForShop(shopId: string): Promise<ShopTag[]> {
    const rowList = <ShopTag[]>await sql`SELECT tag_id,
                                                tag_label,
                                                tag_group,
                                                COUNT(active_tag_shop_id)
                                                FILTER (WHERE active_tag_shop_id = ${shopId})
                                         FROM tag
                                                  LEFT OUTER JOIN public.active_tag ON tag_id = active_tag_tag_id
                                         GROUP BY (tag_id, tag_label, tag_group)`
    return ShopTagSchema.array().parse(rowList)
}