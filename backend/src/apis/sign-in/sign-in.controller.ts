import {Request, Response} from "express"
import {signInAccountSchema} from "./sign-in.validator"
import {zodErrorResponse} from "../../utils/response.utils"
import {PrivateAccount, selectPrivateAccountByAccountEmail} from "../account/account.model"
import {generateJwt, validatePassword} from "../../utils/auth.utils"
import {v4 as uuid } from 'uuid'
import {Status} from "../../utils/interfaces/Status"

/**
 * @endpoint POST /apis/sign-in/
 * @param request an object containing the body of a accountEmail and accountPassword.
 * @param response an object modeling the response that will be sent to the end user.
 * @returns response to the end user telling whether or not the sign in was successsful.
 * @throws {Error} an error indicating what went wrong.
 */




export async function signInController (request: Request, response: Response): Promise<Response> {
    try {

        // validate the new account data coming from the request body
        const validationResult = signInAccountSchema.safeParse(request.body)

        //if validation doesn't work, return a preformatted response to the end user
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // deconstruct the accountEmail and accountPassword from the request body
        const {accountEmail, accountPassword } = validationResult.data

        // select the account by accountEmail from the database
        const account: PrivateAccount | null = await selectPrivateAccountByAccountEmail(accountEmail)

        // created a preformatted response to send to the user if signing in fails
        const signInFailedStatus: Status = { status: 400, message: 'Email or password is incorrect please try again.', data: null }
        if (account === null){
            return response.json(signInFailedStatus)
        }

        // check if the password matches the hash
        const isPasswordValid = await validatePassword( account.accountHash, accountPassword,)

        // checking for failed sign in
        //if signing in failed, return a response to the client

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