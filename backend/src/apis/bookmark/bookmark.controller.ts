import {Request,Response} from "express";
import {
    deleteBookmark,
    insertBookmark,
    Bookmark,
    selectBookmarksByAccountId,
    selectBookmarkByBookmarkAccountId
} from "./bookmark.model";

import {PublicAccount} from "../account/account.model";
import {Status} from "../../utils/interfaces/Status";
import {BookmarkSchema} from "./bookmark.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {z} from "zod";

export async function getBookmarksByBookmarkShopIdController(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = z.string().uuid("please provide a valid bookmarkAccountId").safeParse(request.params.bookmarkAccountId)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const bookmarkAccountId = validationResult.data

        const data = await selectBookmarksByAccountId(bookmarkAccountId)

        return response.json({status:200, message: null, data})
    }

    catch (error) {
        return response.json ({
            status: 500,
            message: '',
            data: []
        })
    }
}


export async function getBookmarksByBookmarkAccountId(request: Request, response: Response): Promise<Response> {
    try {

        const validationResult = z.string().uuid("please provide a valid BookmarkAccountId").safeParse(request.params.bookmarkAccountId)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const bookmarkAccountId = validationResult.data

        const data = await selectBookmarkByBookmarkAccountId(bookmarkAccountId)

        return response.json({status: 200, message: null, data})
    }

    catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}


export async function deleteBookmarkController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = BookmarkSchema.safeParse(request.body)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {bookmarkAccountId} = validationResult.data

        const account = request.session.account

        const bookmarkAccountId = account?.accountId

        const bookmark: Bookmark = {
            bookmarkAccountId
        }

        const status: Status = {
            status: 200,
            message: '',
            data:[]
        }

        const selectedBookmark: Bookmark | null = await selectBookmarksByAccountId(bookmark)

        if (selectedBookmark === null) {
            status.message = await insertBookmark(bookmark)
        } else {
            status.message = await deleteBookmark(bookmark)
        }

        return response.json(status)

    } catch (error: any) {
        return (response.json({status: 500, data: null, message:error.message}))
    }
}

export async function