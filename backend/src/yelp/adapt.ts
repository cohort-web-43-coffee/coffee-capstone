import {sql} from '../utils/database.utils'
import {findAbqCoffeeBusinesses, readBusinessDetails} from './yelp-read'
import {businessDetailsToPhotoEntries, businessDetailsToShopEntry} from './convert'
import {randomUUID} from 'crypto'

export async function isShopTableEmpty (): Promise<boolean> {
    const result = await sql`SELECT COUNT(*)
                             FROM shop`
    return result[0].count === '0'
}

export async function isPhotoTableEmpty (): Promise<boolean> {
    const result = await sql`SELECT COUNT(*)
                             FROM photo`
    return result[0].count === '0'
}

export async function isActiveTagTableEmpty (): Promise<boolean> {
    const result = await sql`SELECT COUNT(*)
                             FROM active_tag`
    return result[0].count === '0'
}
export async function isAccountTableEmpty (): Promise<boolean> {
    const result = await sql`SELECT COUNT(*)
                             FROM account`
    return result[0].count === '0'
}

export async function isBookmarkTableEmpty (): Promise<boolean> {
    const result = await sql`SELECT COUNT(*)
                             FROM bookmark`
    return result[0].count === '0'
}

export async function insertShopAndPhotoDataFromYelp () {
    // is_closed = true indicates that a business has permanently closed
    const businessList = await findAbqCoffeeBusinesses()
    console.log(`Inserting shop details (this will take a while, plz be patient)...`)
    for (const businessEntry of businessList) {
        const businessDetails = await readBusinessDetails(businessEntry.id)
        try {

            const shopId = await insertShopEntry(businessDetails)
            await insertPhotoEntries(businessDetails, shopId)
        } catch (error: any) {
            console.error(`Error inserting: ${JSON.stringify(businessEntry, null, 2)}`)
            throw error
        }
    }
}

async function insertShopEntry (businessDetails: any): Promise<string> {
    const uuid = randomUUID()
    const {shopAddress, shopName, shopPhoneNumber, shopUrl, shopPhotoUrl} = businessDetailsToShopEntry(businessDetails)
    await sql`INSERT INTO shop (shop_id, shop_address, shop_name, shop_phone_number, shop_url, shop_photo_url)
              VALUES (${uuid}, ${shopAddress}, ${shopName}, ${shopPhoneNumber}, ${shopUrl}, ${shopPhotoUrl})`
    return uuid
}

async function insertPhotoEntries (businessDetails: any, shopId: string): Promise<void> {
    const photoEntries = businessDetailsToPhotoEntries(businessDetails)

    for (const photoEntry of photoEntries) {
        const {photoOrder, photoUrl, photoCredit, photoDescription} = photoEntry
        await sql`INSERT INTO photo (photo_id, photo_shop_id, photo_order, photo_url, photo_credit, photo_description)
                  VALUES (gen_random_uuid(), ${shopId}, ${photoOrder}, ${photoUrl}, ${photoCredit},
                          ${photoDescription})`

    }
}