import {z} from 'zod'


/**
 * The shape of the data that comes from the client when activating a account
 * @property accountActivationToken {string} the account's activation token
 */

export const activationAccountSchema = z.object({
    activation: z.string()
        .length(32, {message: 'please provide a valid profileActivationToken'})
})