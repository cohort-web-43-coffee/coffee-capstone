import {NextFunction, Request, Response} from "express";
import {Status} from "../interfaces/Status";
import {PublicAccount} from "../../apis/account/account.model";
import {verify} from "jsonwebtoken";


export function isSignInController(request: Request, response: Response, next: NextFunction): Response | void {
    const status: Status = {status: 401, message: 'Please login', data: null}
    try {
        const account: PublicAccount | undefined = request.session?.account
        const signature: string | undefined = request.session?.signature
        const unverifiedJwtToken: string | undefined = request.headers?.authorization
        if (account === undefined || signature === undefined || unverifiedJwtToken === undefined) {
            console.log(`account ${account} signature ${signature} unverifiedJwtToken ${unverifiedJwtToken}`)
            return response.json(status)
        }
        if (unverifiedJwtToken !== request.session?.jwt) {
            console.error("token mismatched")
            return response.json(status)
        }
        verify(unverifiedJwtToken, signature)
        return next()
    } catch (error: any) {
        return response.json(status)
    }
}