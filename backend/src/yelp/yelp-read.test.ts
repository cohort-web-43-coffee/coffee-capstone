import { expect, test } from 'vitest'
import {findAbqCoffeeBusinesses, readBusinessDetails} from './yelp-read'
import {businessDetailsToPhotoEntries, businessDetailsToShopEntry} from './convert'
import {mockBusinessDetails, mockBusinessLocationSearchResult} from './mocks'

//  TODO: Get > 50 businesses

test('List Albuquerque coffee shops', async () => {
    const result = await findAbqCoffeeBusinesses()

    expect(result).toBeDefined()
    expect(result).toBeTypeOf('object')
    expect(result).toHaveProperty('businesses')
    expect(result.businesses.length).toBe(50)
    expect(result.businesses.every((element: any) => element.location.city.toLowerCase() === 'albuquerque')).true
    expect(result.businesses.every((element: any) => element.location.state.toLowerCase() === 'nm')).true
})

test('Read coffee shop business details', async () => {
    const businessId = mockBusinessLocationSearchResult[0].id
    const result = await readBusinessDetails(businessId)

    expect(result).toBeDefined()
    expect(result).toBeTypeOf('object')
    expect(result).toHaveProperty('name')
    expect(result).toHaveProperty('phone')
    expect(result).toHaveProperty('location')
    expect(result).toHaveProperty('photos')
})

test('Convert yelp data into Shop data', () => {
    const shopData = businessDetailsToShopEntry(mockBusinessDetails)

    expect(shopData).toBeDefined()
    expect(shopData.shopName).toBe('The Grove Cafe & Market')
    expect(shopData.shopAddress).toBe('600 Central Ave SE\nSte A\nAlbuquerque, NM 87102')
    expect(shopData.shopUrl).toBe('https://www.yelp.com/biz/the-grove-cafe-and-market-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=gtw0huIWlUOiqWb7M4oBqQ')
    expect(shopData.shopPhoneNumber).toBe('(505) 248-9800')
})

test('Convert yelp data into Photo data', () => {
    const photoData = businessDetailsToPhotoEntries(mockBusinessDetails)

    expect(photoData).toBeDefined()
    expect(photoData[0].photo_order).toBe(0)
    expect(photoData[0].photo_url).toBe('https://s3-media3.fl.yelpcdn.com/bphoto/FY8GjfG71hD2nZL3LbNOJA/o.jpg')

    expect(photoData[1].photo_order).toBe(1)

    expect(photoData[2].photo_order).toBe(2)
})