import {z} from 'zod';


export const BookmarkSchema = z.object({
    bookmarkAccountId: z.string({required_error:'please provide a valid bookmarkAccountId'}).uuid({message: 'please provide a valid uuid for bookmarkAccountId'}),
    bookmarkShopId: z.string({required_error: 'please provide a valid bookmarkAccountId'}).uuid({message: 'please provide a valid uuid for bookmarkShopId'}),
    bookmarkOrder:z.string({required_error:'please provide a valid bookmarkOrder'})
})