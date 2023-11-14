

import { z } from 'zod'

export const SignUpSchema = z.object({
    accountId: z.string({
        required_error: 'accountId is required',
        invalid_type_error: 'Please provide a valid accountId'
    })
        .uuid({message: 'please provide a valid accountId'})
        .nullable(),
    accountPasswordConfirm: z.string()
        .min(8, {message: 'please provide a valid password for your account (min. 8 characters)'})
        .max(64, {message: 'please provide a valid password for your account (max. 64 characters)'}),
    accountPassword: z.string()
        .min(8, {message: 'please provide a valid password for your account (min. 8 characters)'})
        .max(64, {message: 'please provide a valid password for your account (max. 64 characters)'}),
    accountEmail: z.string({
        required_error: 'accountEmail is required',
        invalid_type_error: 'please provide a valid accountEmail'
    })
        .email({message: 'please provide a valid email'})
        .max(50,{message: 'accountEmail is too long'}),
    accountName: z.string()
        .trim()
        .min(1, {message: 'please provide a valid account name (min 1 characters'})
        .max(32, {message: 'please provide a valid account name (max 32 characters)'}),
    accountActivationToken:z.null()

})
export type SignUp = z.infer<typeof SignUpSchema>