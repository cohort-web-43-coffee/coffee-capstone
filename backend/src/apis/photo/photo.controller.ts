import {Request, Response} from "express";
import {Status} from "../../utils/interfaces/Status";
import {getPhotoByPhotoId, getPhotosByShopId} from "./photo.model";
import {z} from "zod";
import {zodErrorResponse} from "../../utils/response.utils";


export async function getPhotosByShopIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = z.string().uuid({message: 'please provide a valid shopId'}).safeParse(request.params.shopId)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const shopId = validationResult.data
        const data = await getPhotosByShopId(shopId)
        return response.json({
            status: 200,
            message: null,
            data
        })
    } catch (error:any) {
        console.error(error)
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}


export async function getPhotoByPhotoIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = z.string().uuid({message: 'please provide a valid photoId'}).safeParse(request.params.photoId)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const photoId = validationResult.data
        const data = await getPhotoByPhotoId(photoId)
        return response.json({
            status: 200,
            message: null,
            data
        })
    } catch (error:any) {
        console.error(error)
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}
