import {Status} from "../../utils/interfaces/Status";
import {selectPublicAccountByAccountId} from "./account.model";
import {Request, Response} from "express";

/**
 * Express controller for getting the public account by accountId
 * @param request from the end user to the server to get all threads by thread(?) account id
 * @param response from the server to the end user with all threads by thread(?) account id
 * @return {Promise<Response<Status>>} A promise containing the response for the end user with the requested information, or null if the information could not be found, set to the data field
 */
export async function getPublicAccountController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const accountId = request.session.account?.accountId ?? null

        if (accountId === null) {
            return response.json({
                status: 400,
                message: "Session missing account",
                data: null
            })
        }

        const data = await selectPublicAccountByAccountId(accountId)

        //return a response to the end user with the information they need
        return response.json({
            status: 200,
            message: null,
            data
        })

    } catch (error: any) {
        console.error(error)

        //if an error occurs, return a preformatted response to the end user
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}