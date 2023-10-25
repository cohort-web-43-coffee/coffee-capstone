import {Request, Response} from "express";
import {
    deleteBookmark,
    Bookmark,
    selectBookmarksByAccountId, insertBookmark
} from "./bookmark.model";

import {PublicAccount} from "../account/account.model";
import {Status} from "../../utils/interfaces/Status";
import {BookmarkSchema} from "./bookmark.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {z} from "zod";


export async function insertBookmarkController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = BookmarkSchema.safeParse(request.body)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const bookmarkAccountId = request.session.account?.accountId ?? null

        if(bookmarkAccountId === null) {
            return response.json({
                status: 400,
                message: "Session missing account",
                data: null
            })
        }

        const bookmark = {...validationResult.data, bookmarkAccountId}

        const status: Status = {
            status: 200,
            message: 'bookmark inserted',
            data: null
        }

        status.message = await insertBookmark(bookmark)

        return response.json(status)
    } catch (error: any) {
        return (response.json({status: 500, data: null, message: error.message}))
    }
}


export async function getBookmarksByAccountIdController(request: Request, response: Response): Promise<Response> {
    try {
        const bookmarkAccountId = request.session.account?.accountId ?? null

        if(bookmarkAccountId === null) {
            return response.json({
                status: 400,
                message: "Session missing account",
                data: null
            })
        }

        const data = await selectBookmarksByAccountId(bookmarkAccountId)

        return response.json({status: 200, message: null, data})
    } catch (error) {
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

        const bookmarkAccountId = request.session.account?.accountId ?? null

        if(bookmarkAccountId === null) {

            return response.json({
                status: 400,
                message: "Session missing account",
                data: null
            })
        }
        const bookmark = {...validationResult.data, bookmarkAccountId}

        const status: Status = {
            status: 200,
            message: '',
            data: null
        }

        status.message = await deleteBookmark(bookmark)

        return response.json(status)
    } catch (error: any) {
        return (response.json({status: 500, data: null, message: error.message}))
    }

}