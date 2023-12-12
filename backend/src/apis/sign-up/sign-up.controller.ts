import {Request, Response} from 'express'
import {SignUpSchema} from "./sign-up.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {setHash, setActivationToken } from "../../utils/auth.utils";
import {insertAccount, PrivateAccount} from "../account/account.model";
import {Status} from "../../utils/interfaces/Status";
import Mailgun from "mailgun.js";
import formData from 'form-data'


export async function signUpController (request: Request, response: Response): Promise<Response | undefined> {
    try{
        const bodyValidationResult = SignUpSchema.safeParse(request.body)
        if(!bodyValidationResult.success) {
            return zodErrorResponse(response, bodyValidationResult.error)
        }

        const mailgun: Mailgun = new Mailgun(formData)
        const mailgunClient = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY as string})
        const {accountEmail, accountName, accountPassword} = bodyValidationResult.data
        const accountHash = await setHash(accountPassword)
        const accountActivationToken = setActivationToken()

        const basePath: string = `${request.protocol}://${request.hostname}:8080${request.originalUrl}/activation/${accountActivationToken}`
        // create a message for the activation email body
        const message = `<h2>Welcome to Coffee Land.</h2>
        <p>In order to start finding better coffee info you must confirm your account.</p>
        <p><Link href="${basePath}">${basePath}</Link></p>`
        // create a mailgun message object
        const mailgunMessage = {
            from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN as string}>`,
            to: [accountEmail],
            subject: 'One step closer to better coffee! Please activate account.',
            html: message
        }

        const account: PrivateAccount = {
            accountId: null,
            accountEmail,
            accountHash,
            accountActivationToken,
            accountName
        }
        await insertAccount(account)

        await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN as string, mailgunMessage)

        const status: Status = {
            status: 200,
            message: 'Account successfully created please check your email.',
            data: null
        }
        return response.json(status)
    } catch (error: any) {
        console.error(error)
        const status: Status = {
            status: 500,
            message: error.message,
            data: null
        }
        return response.json(status)
    }
}