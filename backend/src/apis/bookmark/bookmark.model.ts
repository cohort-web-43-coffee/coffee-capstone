import {z} from 'zod'
import {BookmarkSchema} from "./bookmark.validator";
import {sql} from "../../utils/database.utils";


export type Bookmark = z.infer<typeof BookmarkSchema>


export async function insertBookmark(bookmark: Bookmark): Promise<string> {
    const {bookmarkAccountId, bookmarkShopId} = bookmark

    await sql`insert into "bookmark" (bookmark_account_id, bookmark_shop_id, bookmark_order)
              values (${bookmarkAccountId},
                      ${bookmarkShopId}, now())`

    return 'bookmark successfully posted'
}

export async function selectBookmarkByBookmarkAccountId(bookmarkAccountId: string): Promise<Array <Bookmark> | null> {

    const rowList = <Bookmark[]>await sql`select bookmark_account_id, bookmark_shop_id, bookmark_order
                                          from "bookmark"
                                          where bookmark_account_id = ${bookmarkAccountId}`
    return BookmarkSchema.array().parse(rowList)
}


export async function deleteBookmark(bookmark: Bookmark): Promise<string> {
    const {bookmarkAccountId, bookmarkShopId} = bookmark

    await sql`delete
              from "bookmark"
              where bookmark_account_id = ${bookmarkAccountId}
                and bookmark_shop_id = ${bookmarkShopId}`

    return 'bookmark successfully deleted'
}

export async function selectBookmarksByAccountId(bookmarkAccountId: string): Promise<Bookmark[]> {

    const rowList = <Bookmark[]>await sql`select bookmark_account_id, bookmark_shop_id, bookmark_order
                                          from "bookmark"
                                          where bookmark_account_id = ${bookmarkAccountId}`

    return BookmarkSchema.array().parse(rowList)
}