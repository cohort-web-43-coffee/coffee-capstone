import {ShopSchema} from "./shop.validator"
import {sql} from "../../utils/database.utils"
import {z} from "zod"

export type Shop = z.infer<typeof ShopSchema>

export async function getShopByShopId (shopId: string): Promise<Shop | null> {
    const rowList = <Shop[]>await sql`select shop_id, shop_address, shop_name, shop_phone_number, shop_url, shop_photo_url
                                      from shop
                                      where shop_id = ${shopId}`
    const result = ShopSchema.array().max(1).parse(rowList)
    return result.length === 0 ? null : result[0]
}


export async function getAllShops (): Promise<Shop[]> {
    const rowList = <Shop[]>await sql`select shop_id, shop_address, shop_name, shop_phone_number, shop_url, shop_photo_url
                                      from shop`
    return ShopSchema.array().parse(rowList)
}

export async function searchShopName (query: string): Promise<Shop[]> {
    const rowList = <Shop[]>await sql`select shop_id, shop_address, shop_name, shop_phone_number, shop_url, shop_photo_url
                                      from shop
                                      where shop_name %> ${query}`
    return ShopSchema.array().parse(rowList)
}

export async function getShopsWithTags (tagIds: string[]): Promise<Shop[]> {
    const sqlTagArray = stringArrayToSQLArrayLiteral(tagIds)
    const rowList = <Shop[]>await sql`select shop_name, shop_address, shop_id, shop_phone_number, shop_url, shop_photo_url, array_agg(DISTINCT active_tag_tag_id)::uuid[]
                                      from shop
                                               join public.active_tag on shop.shop_id = active_tag_shop_id
                                      group by (shop_name, shop_address, shop_id, shop_phone_number, shop_url, shop_photo_url)
                                      having array_agg(DISTINCT active_tag_tag_id)::uuid[] @> ${sqlTagArray}`
    return ShopSchema.array().parse(rowList)
}

function stringArrayToSQLArrayLiteral(strings: string[]): string {
    return `{${strings.join(', ')}}`
}