import {array, z} from 'zod'
import {BookmarkSchema} from "./bookmark.validator";
import {sql} from "../../utils/database.utils";
import {ShopSchema} from "../shop/shop.validator";

// The shape of a bookmark object
export type Bookmark = z.infer<typeof BookmarkSchema>


/**
 * inserts a like into the bookmark table and returns a message
 * @param bookmark to be inserted
 * @returns 'bookmark successfully posted'
 */

export async function insertBookmark(bookmark: Bookmark): Promise<string> {

    //deconstruct the bookmark object
    const {bookmarkAccountId, bookmarkShopId, bookmarkOrder} = bookmark


    //insert the bookmark into the bookmark table
    await sql`insert into "bookmark" (bookmark_account_id, bookmark_shop_id, bookmark_order)
              values (${bookmarkAccountId},
                      ${bookmarkShopId},
                      ${bookmarkOrder})`


    //return a message to the user indicating it was successful
    return 'bookmark successfully posted'
}

/**
 * selects the bookmarks from the bookmark table by bookmarkAccountId and returns the bookmark
 * @param bookmarkAccountId to be selected by bookmarkAccountId
 * @returns the bookmarks that were selected
 */

export async function selectBookmarksByAccountId(bookmarkAccountId: string): Promise<Array<any>> {


    //select the likes from the bookmark table by bookmarkAccountId
    const rowList = <Bookmark[]>await sql `select shop_id, shop_address, shop_name, shop_phone_number, shop_url, shop_photo_url
                                           from shop join public.bookmark  on shop.shop_id = bookmark_shop_id
                                           where bookmark_account_id = ${bookmarkAccountId}
                                           order by bookmark_order`

    //analyze the result into an array of bookmarks then return it
    return ShopSchema.array().parse(rowList)
}

/**
 * deletes a bookmark from the bookmark table and returns a message
 * @param bookmark
 * @returns 'bookmark successfully deleted'
 */
export async function deleteBookmark(bookmark: Bookmark): Promise<string> {

    //deconstruct the bookmark object
    const {bookmarkAccountId, bookmarkShopId} = bookmark

    //delete the bookmark from the bookmark table (send it into the shadow realm)
    await sql`delete
              from "bookmark"
              where bookmark_account_id = ${bookmarkAccountId}
                and bookmark_shop_id = ${bookmarkShopId}`

    //return a message saying it was successfully deleted
    return 'bookmark successfully deleted'
}


