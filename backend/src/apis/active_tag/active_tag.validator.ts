import {z} from 'zod'


export const ActiveTagSchema = z.object({
    activeTagShopId: z.string(
        {
            required_error: 'Please provide a shopId.',
            invalid_type_error: 'shopId must be a valid UUID.'
        }
    ).uuid(),
    activeTagTagId: z.string(
        {
            required_error: 'Please provide a tagId.',
            invalid_type_error: 'tagId must be a valid UUID.'
        }
    ).uuid(),
    activeTagAccountId: z.string(
        {
            required_error: 'Please provide an accountId.',
            invalid_type_error: 'accountId must be a valid UUID.'
        }
    ).uuid()
        .nullable()
})