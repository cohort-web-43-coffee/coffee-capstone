import {z} from "zod";


export const ShopSchema = z.object({
    shopId: z.string({required_error: 'please provide a valid shopId or null.'})
        .uuid({message: 'please provide a valid uuid for shopId'}),
    shopAddress: z.string()
        .max(512, {message: 'the address cannot exceed 512 characters. Please shorten it using the proper abbreviations for the postal service.'}),
    shopName: z.string()
        .max(200, {message: 'The shop name cannot exceed 200 characters.'}),
    shopPhoneNumber: z.string()
        .max(30, {message: 'Too many numbers. Please make sure the phone number is less than 30 characters.'}),
    shopUrl: z.string()
        .max(512, {message: 'the website is too long. Please make sure it is only 512 characters maximum.'})
})