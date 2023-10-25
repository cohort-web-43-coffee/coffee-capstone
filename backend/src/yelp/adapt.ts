import {sql} from '../utils/database.utils'
import {findAbqCoffeeLocations} from './yelp-read'
import {businessDetailsToPhotoEntries, businessDetailsToShopEntry} from './convert'
import {randomUUID} from 'crypto'

export async function isShopTableEmpty (): Promise<boolean> {
    const result = await sql`SELECT COUNT(shop_id)
                             from shop`
    return result[0].count === 0
}

export async function isPhotoTableEmpty (): Promise<boolean> {
    const result = await sql`SELECT COUNT(photo_id) from photo`
    return result[0].count === 0
}

export async function insertData () {
    const businessDetailsList = await findAbqCoffeeLocations()
    for (const businessDetails of businessDetailsList) {
        const shopId = await insertShopEntry(businessDetails)
        await insertPhotoEntries(businessDetails, shopId)
    }
}

async function insertShopEntry (businessDetails: any): Promise<string> {
    const uuid = randomUUID()
    const {shopAddress, shopName, shopPhoneNumber, shopUrl} = businessDetailsToShopEntry(businessDetails)
    await sql`INSERT INTO shop (shop_id, shop_address, shop_name, shop_phone_number, shop_url)
              VALUES (${uuid}, ${shopAddress}, ${shopName}, ${shopPhoneNumber}, ${shopUrl})`
    return uuid
}

async function insertPhotoEntries (businessDetails: any, shopId: string): Promise<void> {
    const photoEntries = businessDetailsToPhotoEntries(businessDetails, shopId)

    for (const photoEntry of photoEntries) {
        const {photoOrder, photoUrl, photoCredit, photoDescription} = photoEntry
        await sql`INSERT INTO photo (photo_id, photo_shop_id, photo_order, photo_url, photo_credit, photo_description)
                  VALUES (gen_random_uuid(), ${shopId}, ${photoOrder}, ${photoUrl}, ${photoCredit}, ${photoDescription})`

    }
}