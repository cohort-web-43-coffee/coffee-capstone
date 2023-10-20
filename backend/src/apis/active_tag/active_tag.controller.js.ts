import {Request, Response} from 'express'
import {ActiveTagSchema} from './active_tag.validator'
import {zodErrorResponse} from '../../utils/response.utils'
import {deleteActiveTag, insertActiveTag} from './active_tag.model'

export async function insertActiveTagController(request: Request, response: Response): Promise<Response> {
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

        if(!validationResult.success) {
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