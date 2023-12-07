import {Request, Response} from 'express'
import {ActiveTagSchema} from './active_tag.validator'
import {zodErrorResponse} from '../../utils/response.utils'
import {deleteActiveTag, insertActiveTag, selectActiveTagsByAccountAndShopId, ActiveTag} from './active_tag.model'
import {z} from 'zod'


export async function postActiveTagController (request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = ActiveTagSchema.safeParse(request.body)

        if (!validationResult.success) {
            console.error('Invalid body')
            return zodErrorResponse(response, validationResult.error)
        }

        const activeTagAccountId = request.session.account?.accountId ?? null

        if (activeTagAccountId === null) {
            return response.json({
                status: 400,
                message: "Session missing account",
                data: null
            })
        }

        const data = {...validationResult.data, activeTagAccountId}
        await insertActiveTag(data)
        return response.json({status: 200, message: null, data: null})
    } catch (error: any) {
        console.error(error.message)
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}

export async function deleteActiveTagController (request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = ActiveTagSchema.safeParse(request.body)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const activeTagAccountId = request.session.account?.accountId ?? null

        if (activeTagAccountId === null) {
            return response.json({
                status: 400,
                message: "Session missing account",
                data: null
            })
        }
        const data = {...validationResult.data, activeTagAccountId}
        await deleteActiveTag(data)

        return response.json({status: 200, message: null, data: null})
    } catch (error: any) {
        console.error(error.message)
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}

export async function getActiveTagsByShopIdController (request: Request, response: Response): Promise<Response> {
    try {

        const accountId = request.session.account?.accountId ?? null

        if (accountId === null) {
            return response.json({
                status: 400,
                message: 'Session missing account',
                data: null
            })
        }

        const validationResult = z.string().uuid('Please provide a valid UUID for shopId').safeParse(request.params.shopId)

        if (!validationResult.success) {
            console.error('Invalid shopId')
            return zodErrorResponse(response, validationResult.error)
        }

        const shopId = validationResult.data

        const data = (await selectActiveTagsByAccountAndShopId(accountId, shopId))
            .reduce((accumulator: string[], tag: ActiveTag) =>
                [...accumulator, tag.activeTagTagId]
            , [])

        return response.json({status: 200, message: null, data})
    } catch (error: any) {
        console.error(error.message)
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}