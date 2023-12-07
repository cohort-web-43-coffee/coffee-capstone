import {Request, Response} from 'express'
import {Status} from '../../utils/interfaces/Status'
import {activationAccountSchema} from './activation.validator'
import {zodErrorResponse} from '../../utils/response.utils'
import {selectPrivateAccountByAccountActivationToken, updateAccount} from '../account/account.model'


export async function activationController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = activationAccountSchema.safeParse(request.params)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {activation} = validationResult.data
        const account = await selectPrivateAccountByAccountActivationToken(activation)

        if (account === null) {
            return response.json({
                status: 400,
                data: null,
                message: 'Account activation has failed. Have you already activated this account?'
            })
        }

        account.accountActivationToken = null
        await updateAccount(account)

        return response.json({
            status: 200,
            data: null,
            message: 'Account activation was successful'
        })
    } catch (error: any) {
        return response.json({status: 500, data: null, message: error.message})
    }
}