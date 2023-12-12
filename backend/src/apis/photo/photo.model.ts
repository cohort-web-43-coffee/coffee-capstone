import {sql} from "../../utils/database.utils";


export async function getPhotosByShopId(shopId: string) {
    try {
        return await sql`select *
            from photo
            where photo_shop_id = ${shopId}`
    } catch (error) {
        console.error('Error retrieving photos by shopId:', error)
    }
}