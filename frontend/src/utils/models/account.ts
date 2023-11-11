import {z} from "zod";
export const AccountSchema = z.object({
    accountId: z.string({
        required_error: 'accountId is required',
        invalid_type_error: 'Please provide a valid accountId'
    })
        .uuid({message: 'please provide a valid accountId'})
        .nullable(),
    accountName: z.string()
        .trim()
        .min(1, {message: 'please provide a valid account name (min 1 characters'})
        .max(32, {message: 'please provide a valid account name (max 32 characters)'})

})
export type Account = z.infer<typeof AccountSchema>