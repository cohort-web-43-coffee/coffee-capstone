import {z} from 'zod';


export const BookmarkSchema = z.object({
    bookmarkAccountId: z.string({required_error: 'please provide a valid bookmarkAccountId'}).uuid({message: 'please provide a valid uuid for bookmarkAccountId'}).nullable(),
    bookmarkShopId: z.string({required_error: 'please provide a valid bookmarkAccountId'}).uuid({message: 'please provide a valid uuid for bookmarkShopId'}).nullable(),
    bookmarkOrder: z.number({required_error: 'please provide a valid bookmarkOrder'}).int()
})