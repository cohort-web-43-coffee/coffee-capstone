import {Request, Response} from 'express'
import {ActiveTagSchema} from './active_tag.validator'
import {zodErrorResponse} from '../../utils/response.utils'
import {
    countActiveTagByTagId,
    deleteActiveTag,
    insertActiveTag,
    selectActiveTagsByAccountId,
    selectActiveTagsByShopId
} from './active_tag.model'
import {z} from 'zod'

export async function postActiveTagController(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = ActiveTagSchema.safeParse(request.body)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const data = validationResult.data
        await insertActiveTag(data)
        return response.json({status: 200, message: null, data})
    } catch (error: any) {
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}

export async function deleteActiveTagController(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = ActiveTagSchema.safeParse(request.body)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const data = validationResult.data
        await deleteActiveTag(data)

        return response.json({status: 200, message: null, data})
    } catch (error: any) {
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}

export async function getActiveTagsByAccountIdController(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = z.string().uuid('Please provide a valid UUID for accountId').safeParse(request.params.accountId)

        if(!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const accountId = validationResult.data
        const data = await selectActiveTagsByAccountId(accountId)

        return response.json({status: 200, message: null, data})
    } catch (error: any) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getActiveTagsByShopIdController(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = z.string().uuid('Please provide a valid UUID for accountId').safeParse(request.params.shopId)

        if(!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const shopId = validationResult.data
        const data = await selectActiveTagsByShopId(shopId)

        return response.json({status: 200, message: null, data})
    } catch (error: any) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}
export async function getActiveTagCountByTagIdController(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = z.string().uuid('Please provide a valid UUID for accountId').safeParse(request.params.tagId)

        if(!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const tagId = validationResult.data
        const data = await countActiveTagByTagId(tagId)

        return response.json({status: 200, message: null, data})
    } catch (error: any) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }

}