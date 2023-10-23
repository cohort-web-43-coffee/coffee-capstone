import {sql} from "../../utils/database.utils";


export async function getPhotosByShopId(shopId: string) {
    try {
        const photos =
            await sql`select *
            from photo
            where photo_shop_id = ${shopId}`
        return photos
    } catch (error) {
        console.error('Error retrieving photos by shopId:', error)


    }
}