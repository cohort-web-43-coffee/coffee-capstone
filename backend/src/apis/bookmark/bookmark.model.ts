import {z} from 'zod'
import {BookmarkSchema} from './bookmark.validator'
import {sql} from '../../utils/database.utils'
import {ShopSchema} from '../shop/shop.validator'


export type Bookmark = z.infer<typeof BookmarkSchema>

export async function insertBookmark(bookmark: Bookmark): Promise<string> {
    const {bookmarkAccountId, bookmarkShopId, bookmarkOrder} = bookmark

    await sql`insert into "bookmark" (bookmark_account_id, bookmark_shop_id, bookmark_order)
    values (${bookmarkAccountId},
            ${bookmarkShopId},
            ${bookmarkOrder})`

    return 'bookmark successfully posted'
}

export async function selectBookmarksByAccountId(bookmarkAccountId: string): Promise<Array<any>> {
    const rowList = <Bookmark[]>await sql `select shop_id, shop_address, shop_name, shop_phone_number, shop_url, shop_photo_url
                                           from shop join public.bookmark  on shop.shop_id = bookmark_shop_id
                                           where bookmark_account_id = ${bookmarkAccountId}
                                           order by bookmark_order`

    return ShopSchema.array().parse(rowList)
}

export async function deleteBookmark(bookmark: Bookmark): Promise<string> {
    const {bookmarkAccountId, bookmarkShopId} = bookmark

    await sql`delete
              from "bookmark"
              where bookmark_account_id = ${bookmarkAccountId}
                and bookmark_shop_id = ${bookmarkShopId}`


    return 'bookmark successfully deleted'
}