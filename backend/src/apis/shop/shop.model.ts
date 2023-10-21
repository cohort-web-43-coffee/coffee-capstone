import {ShopSchema} from "./shop.validator"
import {sql} from "../../utils/database.utils"
import {z} from "zod"

export type Shop = z.infer<typeof ShopSchema>

export async function getShopByShopId(shopId: string): Promise<Shop | null> {
    const rowList = <Shop[]>await sql`select shop_id, shop_address, shop_name, shop_phone_number, shop_url from shop where shop_id = ${shopId}`
    const result = ShopSchema.array().max(1).parse(rowList)
    return result.length === 0 ? null : result[0]
}

export async function getAllShops(): Promise<Shop[]> {
    const rowList = <Shop[]>await sql`select shop_id, shop_address, shop_name, shop_phone_number, shop_url from shop order by shop_name desc`
    return ShopSchema.array().parse(rowList)
}