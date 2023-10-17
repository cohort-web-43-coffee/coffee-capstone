import {Request, Response} from 'express'
import {SignUpSchema} from "./sign-up.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {setHash, setActivationToken } from "../../utils/auth.utils";
import {insertAccount, PrivateAccount} from "../account/account.model";
import {Status} from "../../utils/interfaces/Status";







export async function signUpController (request: Request, response: Response): Promise<Response | undefined> {
    try{
        const bodyValidationResult = SignUpSchema.safeParse(request.body)
        if(!bodyValidationResult.success) {
            return zodErrorResponse(response, bodyValidationResult.error)
        }
        const {accountEmail, accountName, accountPassword} = bodyValidationResult.data
        const accountHash = await setHash(accountPassword)
        const accountActivationToken = setActivationToken()
        const account: PrivateAccount = {
            accountId: null,
            accountEmail,
            accountHash,
            accountActivationToken,
            accountName
        }
        await insertAccount(account)
        const status: Status = {
            status: 200,
            message: 'Account successfully created please check your email.',
            data: null
        }
        return response.json(status)
    } catch (error: any) {
        const status: Status = {
            status: 500,
            message: error.message,
            data: null
        }
        return response.json(status)
    }
}