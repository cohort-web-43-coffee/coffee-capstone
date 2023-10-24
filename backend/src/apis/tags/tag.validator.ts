import {z} from "zod";


export const TagSchema = z.object({
    tagId: z.string({required_error: 'please provide a tagId'})
        .uuid({message: 'please provide a valid uuid for tagId'})
        .nullable(),
    tagGroup: z.string({required_error: 'please provide a tagGroup'})
        .min(1, {message: 'tagGroup must be at least 1 character. Thank you.'})
        .max(512, {message: 'tagGroup must be at most 512 character. Thank you'}),
    tagLabel: z.string({required_error: 'please provide a valid tagId'})
        .min(1, {message: 'tagLabel must be at least 1 character. Thank you.'})
        .max(512, {message: 'tagLabel must be at most 512 character. Thank you.'}),
})