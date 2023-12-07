import { z } from 'zod'

export const PrivateAccountSchema = z.object({
    accountId: z.string({
        required_error: 'accountId is required',
        invalid_type_error: 'Please provide a valid accountId'
    })
        .uuid({message: 'please provide a valid accountId'})
        .nullable(),
    accountEmail: z.string({
        required_error: 'accountEmail is required',
        invalid_type_error: 'please provide a valid accountEmail'
    })
        .email({message: 'please provide a valid email'})
        .max(50,{message: 'accountEmail is too long'}),
    accountHash: z.string({
        required_error: 'accountHash is required',
        invalid_type_error: 'please provide a valid accountHash'
    })
        .length(97,{message:'account hash must be 97 characters'}),
    accountActivationToken: z.string({
            required_error: 'Must have an activationToken',
            invalid_type_error: 'Activation token format is invalid'
        })
        .length(32, {message: 'Activation token needs to be 32 characters long.'})
        .nullable(),
    accountName: z.string()
        .trim()
        .min(1, {message: 'please provide a valid account name (min 1 characters'})
        .max(32, {message: 'please provide a valid account name (max 32 characters)'})

})

export const PublicAccountSchema = PrivateAccountSchema.omit({accountHash: true, accountActivationToken: true})