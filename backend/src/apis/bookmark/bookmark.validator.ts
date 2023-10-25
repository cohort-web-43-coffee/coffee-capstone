import {z} from 'zod';


/**
 * The shape of the bookmark object
 * @property bookmarkAccountId {string} foreign key
 * @property bookmarkShopId {string} foreign key
 * @property bookmarkOrder {number} the order the bookmark was inserted
 */

export const BookmarkSchema = z.object({
    bookmarkAccountId: z.string({required_error: 'please provide a valid bookmarkAccountId'}).uuid({message: 'please provide a valid uuid for bookmarkAccountId'}),
    bookmarkShopId: z.string({required_error: 'please provide a valid bookmarkAccountId'}).uuid({message: 'please provide a valid uuid for bookmarkShopId'}),
    bookmarkOrder: z.number({required_error: 'please provide a valid bookmarkOrder'}).int()
})