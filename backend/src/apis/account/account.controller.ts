import {Status} from "../../utils/interfaces/Status";
import {PublicAccountSchema} from "./account.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {
    selectPublicAccountByAccountId
} from "./account.model";
import {Request, Response} from "express";


export async function getPublicAccountByAccountIdController (request: Request, response: Response) : Promise<Response<Status>> {
    try {
        const validationResult = PublicAccountSchema.pick({accountId: true}).safeParse(request.params)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {accountId} = validationResult.data
        console.log(accountId)
        const data = await selectPublicAccountByAccountId(accountId)
        return response.json({
            status: 200,
            message: null,
            data
        })
    } catch (error: any) {
        console.error(error)
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}

