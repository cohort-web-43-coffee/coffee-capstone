import {TagSchema} from "./tag.validator";
import {z} from "zod";
import {sql} from "../../utils/database.utils";


export type Tag = z.infer<typeof TagSchema>
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
 * selects tags from the tag table by tagLabel and returns the tags
 * @param tagLabel to be selected by tagLabel
 * @returns the tags that were selected
 */
export async function getAllTagsByTagLabel(tagLabel: string): Promise<Tag[]> {
    //selects the tags from the tag table by tagLabel
    const rowList = <Tag[]>await sql `select tag_id, tag_group, tag_label from tag where tag_label = ${tagLabel}`
    // parse the result into an array of likes and return it
    return TagSchema.array().parse(rowList)
}

