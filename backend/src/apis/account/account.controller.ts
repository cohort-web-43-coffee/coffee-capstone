import {Status} from "../../utils/interfaces/Status";
import {PublicAccountSchema} from "./account.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {
    selectPublicAccountByAccountId
} from "./account.model";
import {Request, Response} from "express";


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