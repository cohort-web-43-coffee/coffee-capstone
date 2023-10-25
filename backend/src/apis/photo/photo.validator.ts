import {z} from "zod"
export const PhotoSchema = z.object({
    photo_id: z.string(
        {required_error: 'please provide a valid photoId or null'})
        .uuid({message: 'please provide a valid uuid for photoId'})
        .nullable(),
    photo_shop_id: z.string(
        {required_error: 'please provide a valid photoShopId'})
        .uuid({message: 'please provide a valid uuid for photoshopId'}),
    photo_credit: z.string(),
    photo_description: z.string(),
    photo_order: z.number(),
    photo_url: z.string({required_error: 'please provide a valid threadImageUrl or null'})
        .trim()
        .url({message: 'please provide a valid URL for threadImageUrl'})
        .max(255, {message: 'please provide a valid threadImageUrl (max 255 characters)'})
        .nullable(),
});