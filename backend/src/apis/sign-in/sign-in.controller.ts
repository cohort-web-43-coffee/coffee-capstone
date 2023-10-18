import {Request, Response} from "express"
import {signInAccountSchema} from "./sign-in.validator"
import {zodErrorResponse} from "../../utils/response.utils"
import {PrivateAccount, selectPrivateAccountByAccountEmail} from "../account/account.model"
import {generateJwt, validatePassword} from "../../utils/auth.utils"
import {v4 as uuid } from 'uuid'
import {Status} from "../../utils/interfaces/Status"

export async function signInController (request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = signInAccountSchema.safeParse(request.body)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {accountEmail, accountPassword } = validationResult.data
        const account: PrivateAccount | null = await selectPrivateAccountByAccountEmail(accountEmail)
        const signInFailedStatus: Status = { status: 400, message: 'Email or password is incorrect please try again.', data: null }
        if (account === null){
            return response.json(signInFailedStatus)
        }
        const isPasswordValid = await validatePassword( account.accountHash, accountPassword,)
        if (!isPasswordValid) {
            return response.json(signInFailedStatus)
        }

        const { accountId, accountActivationToken, accountName} = account

        const signature: string = uuid()

        const authorization: string = generateJwt({
            accountId,
            accountEmail,
            accountPassword,
            accountActivationToken,
            accountName
        }, signature )

        request.session.account = account
        request.session.jwt = authorization
        request.session.signature = signature

        response.header({
            authorization
        })
        return response.json({ status: 200, message: 'Sign in successful', data: null })
    } catch (error: any) {
        return response.json({ status: 500, data: null, message: error.message })

    }
}