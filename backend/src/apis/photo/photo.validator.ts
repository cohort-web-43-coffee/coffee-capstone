import {z} from "zod"
export const PhotoSchema = z.object({
    photo_shop_id: z.string(
        {required_error: 'please provide a valid photoId or null.'})
        .uuid({message: 'please provide a valid uuid for shopId'})
        .nullable(),
    photo_credit: z.string(),
    photo_description: z.string(),
    photo_order: z.number(),
    photo_url: z.string()
        .nullable(),
});