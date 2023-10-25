import {Status} from "../../utils/interfaces/Status";
import {PublicAccountSchema} from "./account.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {
    selectPublicAccountByAccountId
} from "./account.model";
import {Request, Response} from "express";


<<<<<<< HEAD
export async function getPublicAccountController (request: Request, response: Response) : Promise<Response<Status>> {
    try {
        const accountId = request.session.account?.accountId ?? null

        if(accountId === null) {
            return response.json({
                status: 400,
                message: "Session missing account",
                data: null
            })
        }

=======
/**
 * Express controller for getting the public account by accountId
 * @param request from the end user to the server to get all threads by thread(?) account id
 * @param response from the server to the end user with all threads by thread(?) account id
 * @return {Promise<Response<Status>>} A promise containing the response for the end user with the requested information, or null if the information could not be found, set to the data field
 */

export async function getPublicAccountByAccountIdController(request: Request, response: Response): Promise<Response<Status>> {
    try {

        // validate the AccountId coming from the request parameters
        const validationResult = PublicAccountSchema.pick({accountId: true}).safeParse(request.params)

        //if validation is not successful,return a response to the end user
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // grab the account id off the validated request parameters
        const {accountId} = validationResult.data
        console.log(accountId)


        //grab the account by the accountid
>>>>>>> doc-blocks
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