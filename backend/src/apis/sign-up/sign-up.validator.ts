import {z} from 'zod'
import {PrivateAccountSchema} from "../account/account.validator"


/**
 * The shape of the data that comes from the client when signing up
 * @property accountPasswordConfirm {string} the password confirmation
 * @property accountPassword {string} the password
 */

export const SignUpSchema = PrivateAccountSchema
    .omit({accountHash: true})
    .extend({
        accountPasswordConfirm: z.string()
            .min(8, {message: 'please provide a valid password for your account (min. 8 characters)'})
            .max(64, {message: 'please provide a valid password for your account (max. 64 characters)'}),
        accountPassword: z.string()
            .min(8, {message: 'please provide a valid password for your account (min. 8 characters)'})
            .max(64, {message: 'please provide a valid password for your account (max. 64 characters)'})
    })
    .refine(data => data.accountPassword === data.accountPasswordConfirm,
        {message: 'passwords do not match. Please fix this.'}
    )