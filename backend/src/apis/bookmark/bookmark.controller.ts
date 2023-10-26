import {Request, Response} from "express";
import {
    deleteBookmark,
    selectBookmarksByAccountId, insertBookmark
} from "./bookmark.model";

import {Status} from "../../utils/interfaces/Status";
import {BookmarkSchema} from "./bookmark.validator";
import {zodErrorResponse} from "../../utils/response.utils";


export async function insertBookmarkController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        // validates the bookmarkAccountId coming from the bookmarkSchema
        const validationResult = BookmarkSchema.safeParse(request.body)

        // if validation does fail, return an error response to the end user
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

        //create status object

        const status: Status = {
            status: 200,
            message: 'bookmark inserted',
            data: null
        }

        //insert the bookmark into the bookmark table
        status.message = await insertBookmark(bookmark)


        //return the status to the user
        return response.json(status)

        //if any error occurs tell it to the user
    } catch (error: any) {
        return (response.json({status: 500, data: null, message: error.message}))
    }
}


/**
 * Handles GET request for all bookmarks associated with an account
 * @param request object containing the bookmark account id
 * @param response object containing the status of the request and the bookmarks associated with the account
 */


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

        // return the status and the bookmarks associated with the account
        return response.json({status: 200, message: null, data})

        // if any error occurs, return that error to the end user
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

        //validate the incoming request with the bookmark schema
        const validationResult = BookmarkSchema.safeParse(request.body)

        // if the validation fails, return a response to the end user
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

        // create a status object to say everything's alright on both ends
        const status: Status = {
            status: 200,
            message: '',
            data: null
        }

        //delete the bookmark from the bookmark table
        status.message = await deleteBookmark(bookmark)

        //return the status to the end user
        return response.json(status)

        // if an error occurs, return the error to the end user
    } catch (error: any) {
        return (response.json({status: 500, data: null, message: error.message}))
    }

}