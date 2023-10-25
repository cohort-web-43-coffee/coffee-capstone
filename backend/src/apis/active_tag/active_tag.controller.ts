import {Request, Response} from 'express'
import {ActiveTagSchema} from './active_tag.validator'
import {zodErrorResponse} from '../../utils/response.utils'
import {
    countActiveTagByTagId, countActiveTagByTagIdAndShopId,
    deleteActiveTag,
    insertActiveTag,
    selectActiveTagsByAccountId,
    selectActiveTagsByShopId
} from './active_tag.model'
import {z} from 'zod'

/**
 *
 * @param request
 * @param response
 */
export async function postActiveTagController(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = ActiveTagSchema.safeParse(request.body)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const activeTagAccountId = request.session.account?.accountId ?? null

        if(activeTagAccountId === null) {
            return response.json({
                status: 400,
                message: "Session missing account",
                data: null
            })
        }

        const data = {...validationResult.data, activeTagAccountId }
        console.log(data)
        await insertActiveTag(data)
        return response.json({status: 200, message: null, data})
    } catch (error: any) {
        console.log(error.message)
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}

/**
 *
 * @param request
 * @param response
 */

export async function deleteActiveTagController(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = ActiveTagSchema.safeParse(request.body)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const activeTagAccountId = request.session.account?.accountId ?? null

        if(activeTagAccountId === null) {
            return response.json({
                status: 400,
                message: "Session missing account",
                data: null
            })
        }
        const data = {...validationResult.data, activeTagAccountId }
        await deleteActiveTag(data)

        return response.json({status: 200, message: null, data: null})
    } catch (error: any) {
        console.log(error.message)
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}

/**
 *
 * @param request
 * @param response
 */

export async function getActiveTagsByAccountIdController(request: Request, response: Response): Promise<Response> {

    try {

        const accountId = request.session.account?.accountId ?? null

        if(accountId === null) {
            return response.json({
                status: 400,
                message: "Session missing account",
                data: null
            })
        }
        const data = await selectActiveTagsByAccountId(accountId)

        return response.json({status: 200, message: null, data})
    } catch (error: any) {
        console.log(error.message)
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}


/**
 *
 * @param request
 * @param response
 */

export async function getActiveTagsByShopIdController(request: Request, response: Response): Promise<Response> {

    try {
        const validationResult = z.string().uuid('Please provide a valid UUID for accountId').safeParse(request.params.shopId)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const shopId = validationResult.data
        const data = await selectActiveTagsByShopId(shopId)

        return response.json({status: 200, message: null, data})
    } catch (error: any) {
        console.log(error.message)
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}


/**
 *
 * @param request
 * @param response
 */

export async function getActiveTagCountByTagIdController(request: Request, response: Response): Promise<Response> {

    try {
        const validationResult = z.string().uuid('Please provide a valid UUID for tagId').safeParse(request.params.tagId)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const tagId = validationResult.data
        const data = await countActiveTagByTagId(tagId)

        return response.json({status: 200, message: null, data})
    } catch (error: any) {
        console.log(error.message)
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}


/**
 *
 * @param request
 * @param response
 */

export async function getActiveTagCountByTagIdAndShopIdController(request: Request, response: Response): Promise<Response> {

    try {
        const shopIdValidationResult = z.string().uuid('Please provide a valid UUID for shopId')
            .safeParse(request.params.shopId)

        if (!shopIdValidationResult.success) {
            return zodErrorResponse(response, shopIdValidationResult.error)
        }

        const tagIdValidationResult = z.string().uuid('Please provide a valid UUID for tagId')
            .safeParse(request.params.tagId)

        if (!tagIdValidationResult.success) {
            return zodErrorResponse(response, tagIdValidationResult.error)
        }

        const shopId = shopIdValidationResult.data
        const tagId = tagIdValidationResult.data
        const data = await countActiveTagByTagIdAndShopId(tagId, shopId)

        return response.json({status: 200, message: null, data})
    } catch (error: any) {
        console.log(error.message)
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}