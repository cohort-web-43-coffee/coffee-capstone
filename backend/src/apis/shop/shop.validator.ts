import {z} from "zod";


export const ShopSchema = z.object({
    shopId: z.string({required_error: 'please provide a valid shopId or null.'})
        .uuid({message: 'please provide a valid uuid for shopId'}),
    shopAddress: z.string()
        .min(1, {message: 'the address has to exist so please type it in'})
        .max(60, {message: 'the address cannot exceed 60 characters. Please shorten it using the proper abbreviations for the postal service.'}),
    shopName: z.string()
        .min(1, {message: 'Ok. In order to exist the shop has to have a name. Please type it in.'})
        .max(200, {message: 'The shop name cannot exceed 200 characters.'}),
    shopPhoneNumber: z.string()
        .min(1, {message: 'please put down the phone number of the coffee shop.'})
        .max(30, {message: 'Too many numbers. Please make sure the phone number is less than 30 characters.'}),
    shopUrl: z.string()
        .min(1, {message: 'Please put down the shops website url.'})
        .max(60, {message: 'the website is too long. Please make sure it is only 60 characters maximum.'})
})