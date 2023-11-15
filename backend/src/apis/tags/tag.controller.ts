import {Request, Response} from "express"
import {TagSchema} from "./tag.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {Status} from "../../utils/interfaces/Status";
import {getAllTagsByTagGroup, getAllTagsByTagLabel, getTagsForShop, insertTag} from "./tag.model";
import {z} from "zod";



export async function insertTagController(request: Request, response: Response): Promise<Response<Status>> {
    try{
        const validationResult = TagSchema.safeParse(request.body)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const tag = validationResult.data
        const status: Status = {
            status: 200,
            message: 'Tag created successfully! Go drink coffee',
            data: null
        }
        status.message = await insertTag(tag)
        return response.json(status)

    } catch (error:any) {
        console.error(error)
        return response.json ({
            status: 500,
            message: error.message,
            data: null
        })
    }
}


export async function getAllTagsByTagGroupController(request: Request, response: Response): Promise<Response<Status>> {
    try{
        const validationResult = z.string({required_error: 'please provide a tagGroup'})
                .min(1, {message: 'tagGroup must be at least 1 character. Thank you.'})
                .max(512, {message: 'tagGroup must be at most 512 character. Thank you'}).safeParse(request.params.tagGroup)
        // const TagGroupValidator = TagSchema.pick({tagGroup: true})
        // const validationResult = TagGroupValidator.safeParse(request.params.tagGroup)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const tagGroup = validationResult.data
        const data = await getAllTagsByTagGroup(tagGroup)
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
            data: null
        })
    }
}

/**
 * Handles GET request for all tags associated with a specific label
 * @param request object containing the tag label
 * @param response object containing the status of the request and the tags associated with the tag label
 * @returns status object containing the status of the request and the tags associated with the tag label
 */
export async function getAllTagsByTagLabelController(request: Request, response: Response): Promise<Response<Status>> {
    try{
        // validate the tagLabel coming from the request parameters
        const validationResult = z.string({required_error: 'please provide a tagLabel'})
            .min(1, {message: 'tagLabel must be at least 1 character. Thank you.'})
            .max(512, {message: 'tagLabel must be at most 512 character. Thank you'}).safeParse(request.params.tagLabel)
        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        // if the validation succeeds, continue

        // deconstruct the tag Label from the request parameters
        const tagLabel = validationResult.data
        // select the tags by like tag label
        const data = await getAllTagsByTagLabel(tagLabel)
        // return the status and the tags associated with the label
        return response.json({
            status: 200,
            message: null,
            data
        })
        // if an error occurs, return the error to the user
    } catch (error: any) {
        console.error(error)
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}
export async function getShopTagsController(request: Request, response: Response): Promise<Response<Status>> {
    try{
        const validationResult =  z.string().uuid('Please provide a valid UUID for shopId').safeParse(request.params.shopId)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const shopId = validationResult.data
        console.log('shopId:', shopId)
        const data = await getTagsForShop(shopId)

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
            data: null
        })
    }
}