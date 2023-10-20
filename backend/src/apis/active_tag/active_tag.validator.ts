import {z} from 'zod'

export const ActiveTagSchema = z.object({
    shopId: z.string(
        {
            required_error: 'Please provide a shopId.',
            invalid_type_error: 'shopId must be a valid UUID.'
        }
    ).uuid(),

    tagId: z.string(
        {
            required_error: 'Please provide a tagId.',
            invalid_type_error: 'shopId must be a valid UUID.'
        }
    ).uuid(),

    accountId: z.string(
        {
            required_error: 'Please provide an accountId.',
            invalid_type_error: 'shopId must be a valid UUID.'
        }
    ).uuid()
})