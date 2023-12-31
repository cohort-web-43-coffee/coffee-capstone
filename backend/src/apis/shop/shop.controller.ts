import {Status} from "../../utils/interfaces/Status";
import {Request, Response} from "express";
import {getAllShops, getShopByShopId, getShopsWithTags, searchShopName} from "./shop.model";
import {z} from "zod";
import {zodErrorResponse} from "../../utils/response.utils";


export async function getAllShopsController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const data = await getAllShops()
        const status: Status = {
            status: 200,
            message: null,
            data
        }
        return response.json(status)
    } catch (error) {
        console.error(error)
        return response.json({
            status: 500,
            message: 'Error getting shops. Please try again. And get some coffee.',
            data: []
        })
    }
}

export async function getShopByShopIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = z.string().uuid({message: 'please provide a valid shopId'}).safeParse(request.params.shopId)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const shopId = validationResult.data
        const data = await getShopByShopId(shopId)

        return response.json({
            status: 200,
            message: null,
            data
        })
    } catch (error) {
        console.error(error)
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function searchShopByNameController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const search = request.query.name as string

        if (search === undefined) {
            return response.json({
                status: 500,
                message: 'Search term was undefined.',
                data: []
            })
        }

        const data = await searchShopName(search)
        return response.json({
            status: 200,
            message: null,
            data
        })
    } catch (error: any) {
        console.error(error)
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}

export async function getsShopsWithTagsController (request: Request, response: Response): Promise<Response> {
    try {
        const validator = z.string().array()
        const validationResult = validator.safeParse(request.body)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const tagIds = validationResult.data
        const data = await getShopsWithTags(tagIds)

        return response.json({
            status: 200,
            message: null,
            data
        })

    } catch (error: any) {
        console.error(error)
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}