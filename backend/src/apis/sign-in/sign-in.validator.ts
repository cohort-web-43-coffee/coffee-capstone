import {z} from 'zod'

/**
 * The shape of data that comes from the end user when signing in
 * @property accountPassword {string} the password
 * @property accountEmail {string} the email
*/
export const signInAccountSchema = z.object({
    accountPassword: z.string().min(8,{ message: 'please provide a valid password (min 8 characters)' }).max(32, { message: 'please provide a valid password (max 32 characters)' }),
    accountEmail: z.string().email({ message: 'please provide a valid email' }).max(128, { message: 'please provide a valid email (max 128 characters)' })
})