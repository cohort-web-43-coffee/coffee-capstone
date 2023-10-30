import {z} from "zod"
export const PhotoSchema = z.object({
    photoId: z.string(
        {required_error: 'please provide a valid photoId or null', invalid_type_error: "please provide a valid photo id"})
        .uuid({message: 'please provide a valid uuid for photoId'})
        .nullable(),
    photoShopId: z.string(
        {required_error: 'please provide a valid photoShopId', invalid_type_error: "please provide a valid photo shop id"})
        .uuid({message: 'please provide a valid uuid for photoshopId'}),
    photoCredit: z.string({invalid_type_error: "please provide a valid photo credit"}),
    photoDescription: z.string({invalid_type_error: "please provide a valid photo description"}),
    photoOrder: z.number({invalid_type_error: "please provide a valid photo order"}),
    photoUrl: z.string({required_error: 'please provide a valid threadImageUrl or null', invalid_type_error: "please provide a valid photo url"})
        .trim()
        .url({message: 'please provide a valid URL for threadImageUrl'})
        .max(512, {message: 'please provide a valid threadImageUrl (max 512 characters)'})
        .nullable(),
});