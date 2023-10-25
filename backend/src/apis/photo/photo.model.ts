import {sql} from "../../utils/database.utils";
import {PhotoSchema} from "./photo.validator";
import {z} from "zod";


export type Photo = z.infer<typeof PhotoSchema>


export async function getPhotosByShopId(shopId: string) {
    try {
        return await sql`select *
            from photo
            where photo_shop_id = ${shopId}`
    } catch (error) {
        console.error('Error retrieving photos by shopId:', error)


    }
}

export async function getPhotoByPhotoId(photoId: string): Promise<Photo | null> {
    const rowList = <Photo[]>await sql`select photo_id,
                                              photo_shop_id,
                                              photo_credit,
                                              photo_description,
                                              photo_order,
                                              photo_url
                                       from photo
                                       where photo_id = ${photoId}`
    const result = PhotoSchema.array().max(1).parse(rowList)
    return result.length === 0 ? null : result[0]
}

