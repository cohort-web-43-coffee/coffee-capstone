import {Request, Response} from "express"
import {TagSchema} from "./tag.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {Status} from "../../utils/interfaces/Status";
import {getAllTagsByTagGroup, insertTag, Tag} from "./tag.model";


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
        const validationResult = TagSchema.safeParse(request.body)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const tagGroup = validationResult.data.tagGroup
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