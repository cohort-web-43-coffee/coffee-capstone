import { expect, test } from 'vitest'
import {findAbqCoffeeLocations} from './getcity'
import {readBusinessDetails} from './read-business-details'
import {businessDetailsToPhotoEntries, businessDetailsToShopEntry} from './convert'


//  TODO: Filter businesses for isClosed
// TODO: Set search limit to 50
test('List Albuquerque coffee shops', async () => {
    const result = await findAbqCoffeeLocations()

    expect(result).toBeDefined()
    expect(result).toBeTypeOf('object')
    expect(result).toHaveProperty('businesses')
    expect(result.businesses.length).toBe(50)
    expect(result.businesses.every((element) => element.location.city.toLowerCase() === 'albuquerque')).true
    expect(result.businesses.every((element) => element.location.state.toLowerCase() === 'nm')).true
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
    const mockUuid = 45
    const photoData = businessDetailsToPhotoEntries(mockBusinessDetails, mockUuid)

    expect(photoData).toBeDefined()
    expect(photoData[0].photo_shop_id).toBe(45)
    expect(photoData[0].photo_order).toBe(0)
    expect(photoData[0].photo_url).toBe('https://s3-media3.fl.yelpcdn.com/bphoto/FY8GjfG71hD2nZL3LbNOJA/o.jpg')

})

const mockBusinessDetails = {
    "id": "N8TBIDZwEaWm9czkF9Ncdw",
    "alias": "the-grove-cafe-and-market-albuquerque",
    "name": "The Grove Cafe & Market",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/FY8GjfG71hD2nZL3LbNOJA/o.jpg",
    "is_claimed": true,
    "is_closed": false,
    "url": "https://www.yelp.com/biz/the-grove-cafe-and-market-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
    "phone": "+15052489800",
    "display_phone": "(505) 248-9800",
    "review_count": 1464,
    "categories": [
        {
            "alias": "coffee",
            "title": "Coffee & Tea"
        },
        {
            "alias": "newamerican",
            "title": "American (New)"
        },
        {
            "alias": "cafes",
            "title": "Cafes"
        }
    ],
    "rating": 4.5,
    "location": {
        "address1": "600 Central Ave SE",
        "address2": "Ste A",
        "address3": "",
        "city": "Albuquerque",
        "zip_code": "87102",
        "country": "US",
        "state": "NM",
        "display_address": [
            "600 Central Ave SE",
            "Ste A",
            "Albuquerque, NM 87102"
        ],
        "cross_streets": ""
    },
    "coordinates": {
        "latitude": 35.0828,
        "longitude": -106.6404699
    },
    "photos": [
        "https://s3-media3.fl.yelpcdn.com/bphoto/FY8GjfG71hD2nZL3LbNOJA/o.jpg",
        "https://s3-media1.fl.yelpcdn.com/bphoto/UmVbLaTWA3tjc9kxx-Ec4A/o.jpg",
        "https://s3-media4.fl.yelpcdn.com/bphoto/4wP1JBeIsC5ElCFckGO6zQ/o.jpg"
    ],
    "price": "$$",
    "hours": [
        {
            "open": [
                {
                    "is_overnight": false,
                    "start": "0800",
                    "end": "1400",
                    "day": 1
                },
                {
                    "is_overnight": false,
                    "start": "0800",
                    "end": "1400",
                    "day": 2
                },
                {
                    "is_overnight": false,
                    "start": "0800",
                    "end": "1400",
                    "day": 3
                },
                {
                    "is_overnight": false,
                    "start": "0800",
                    "end": "1400",
                    "day": 4
                },
                {
                    "is_overnight": false,
                    "start": "0800",
                    "end": "1400",
                    "day": 5
                },
                {
                    "is_overnight": false,
                    "start": "0800",
                    "end": "1400",
                    "day": 6
                }
            ],
            "hours_type": "REGULAR",
            "is_open_now": true
        }
    ],
    "transactions": [
        "delivery"
    ]
}

const mockBusinessLocationSearchResult = [
    {
        "id": "N8TBIDZwEaWm9czkF9Ncdw",
        "alias": "the-grove-cafe-and-market-albuquerque",
        "name": "The Grove Cafe & Market",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/FY8GjfG71hD2nZL3LbNOJA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/the-grove-cafe-and-market-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 1464,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "newamerican",
                "title": "American (New)"
            },
            {
                "alias": "cafes",
                "title": "Cafes"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 35.0828,
            "longitude": -106.6404699
        },
        "transactions": [
            "delivery"
        ],
        "price": "$$",
        "location": {
            "address1": "600 Central Ave SE",
            "address2": "Ste A",
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87102",
            "country": "US",
            "state": "NM",
            "display_address": [
                "600 Central Ave SE",
                "Ste A",
                "Albuquerque, NM 87102"
            ]
        },
        "phone": "+15052489800",
        "display_phone": "(505) 248-9800",
        "distance": 4781.3446831488045
    },
    {
        "id": "fcxkjHX7vLKe6BMqeLJ5wg",
        "alias": "tia-bs-la-waffleria-albuquerque",
        "name": "Tia B's La Waffleria",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/jfMc0IGHEmUYaNfo862V7A/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/tia-bs-la-waffleria-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 686,
        "categories": [
            {
                "alias": "breakfast_brunch",
                "title": "Breakfast & Brunch"
            },
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 35.0803681,
            "longitude": -106.6051949
        },
        "transactions": [
            "delivery"
        ],
        "price": "$$",
        "location": {
            "address1": "3710 Campus Blvd NE",
            "address2": "",
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87106",
            "country": "US",
            "state": "NM",
            "display_address": [
                "3710 Campus Blvd NE",
                "Albuquerque, NM 87106"
            ]
        },
        "phone": "+15054922007",
        "display_phone": "(505) 492-2007",
        "distance": 3888.4915424778774
    },
    {
        "id": "Puz2qP-tvCJWxVGK4FPl0w",
        "alias": "the-farmacy-albuquerque",
        "name": "The Farmacy",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/Jn7M6EUl0NB_i4F8ymRULw/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/the-farmacy-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 642,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "breakfast_brunch",
                "title": "Breakfast & Brunch"
            },
            {
                "alias": "sandwiches",
                "title": "Sandwiches"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 35.07938,
            "longitude": -106.60244
        },
        "transactions": [
            "delivery"
        ],
        "price": "$$",
        "location": {
            "address1": "3718 Central Ave SE",
            "address2": null,
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87108",
            "country": "US",
            "state": "NM",
            "display_address": [
                "3718 Central Ave SE",
                "Albuquerque, NM 87108"
            ]
        },
        "phone": "+15052270330",
        "display_phone": "(505) 227-0330",
        "distance": 4017.368207958318
    },
    {
        "id": "3DovfzfBpz8RuTXYe-JQLQ",
        "alias": "central-grill-and-coffee-house-albuquerque",
        "name": "Central Grill and Coffee House",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/OBpmfxbIHFsOZ9t-b4tTVQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/central-grill-and-coffee-house-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 1159,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "sandwiches",
                "title": "Sandwiches"
            },
            {
                "alias": "breakfast_brunch",
                "title": "Breakfast & Brunch"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 35.094386180335256,
            "longitude": -106.67068121027614
        },
        "transactions": [
            "pickup",
            "delivery"
        ],
        "price": "$$",
        "location": {
            "address1": "2056 Central Ave SW",
            "address2": "",
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87104",
            "country": "US",
            "state": "NM",
            "display_address": [
                "2056 Central Ave SW",
                "Albuquerque, NM 87104"
            ]
        },
        "phone": "+15055541424",
        "display_phone": "(505) 554-1424",
        "distance": 6345.339829540766
    },
    {
        "id": "sIalQpJmlZrvQm6oqocJsA",
        "alias": "tia-betty-blues-albuquerque",
        "name": "Tia Betty Blue's",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/OWiMWhjAZDince47weBNhQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/tia-betty-blues-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 695,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "breakfast_brunch",
                "title": "Breakfast & Brunch"
            },
            {
                "alias": "newmexican",
                "title": "New Mexican Cuisine"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 35.0622210813679,
            "longitude": -106.586007536771
        },
        "transactions": [
            "delivery"
        ],
        "price": "$$",
        "location": {
            "address1": "1248 San Mateo Blvd SE",
            "address2": "",
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87108",
            "country": "US",
            "state": "NM",
            "display_address": [
                "1248 San Mateo Blvd SE",
                "Albuquerque, NM 87108"
            ]
        },
        "phone": "+15052681955",
        "display_phone": "(505) 268-1955",
        "distance": 6174.365058028668
    },
    {
        "id": "PcRRGbNIGQ-n3-qXs3pVfA",
        "alias": "golden-crown-panaderia-albuquerque",
        "name": "Golden Crown Panaderia",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/MR19EHXba8DxN5A-uHVjqw/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/golden-crown-panaderia-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 707,
        "categories": [
            {
                "alias": "bakeries",
                "title": "Bakeries"
            },
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "pizza",
                "title": "Pizza"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 35.0957207234847,
            "longitude": -106.658451885088
        },
        "transactions": [
            "pickup",
            "delivery"
        ],
        "price": "$$",
        "location": {
            "address1": "1103 Mountain Rd NW",
            "address2": "",
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87102",
            "country": "US",
            "state": "NM",
            "display_address": [
                "1103 Mountain Rd NW",
                "Albuquerque, NM 87102"
            ]
        },
        "phone": "+15052432424",
        "display_phone": "(505) 243-2424",
        "distance": 5262.964736693889
    },
    {
        "id": "xF2h3ZCFNFWS3h38HqIOwQ",
        "alias": "the-shop-albuquerque-3",
        "name": "The Shop",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/aDxvmA97peHsRCatCAl-OA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/the-shop-albuquerque-3?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 342,
        "categories": [
            {
                "alias": "breakfast_brunch",
                "title": "Breakfast & Brunch"
            },
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "diners",
                "title": "Diners"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 35.0816695744646,
            "longitude": -106.612498457672
        },
        "transactions": [
            "delivery"
        ],
        "price": "$$",
        "location": {
            "address1": "2933 Monte Vista Blvd NE",
            "address2": "",
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87106",
            "country": "US",
            "state": "NM",
            "display_address": [
                "2933 Monte Vista Blvd NE",
                "Albuquerque, NM 87106"
            ]
        },
        "phone": "+15054332795",
        "display_phone": "(505) 433-2795",
        "distance": 3792.6926853106993
    },
    {
        "id": "TCOm9eQ0Vuhddj0IpdONDw",
        "alias": "sueños-coffee-albuquerque-4",
        "name": "Sueños Coffee",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/2oWPKpLD5ld2MZMWO5fqiA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/sue%C3%B1os-coffee-albuquerque-4?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 23,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "sandwiches",
                "title": "Sandwiches"
            }
        ],
        "rating": 5,
        "coordinates": {
            "latitude": 35.08459163587628,
            "longitude": -106.64511884949636
        },
        "transactions": [],
        "location": {
            "address1": "101 Broadway Blvd NE",
            "address2": "",
            "address3": null,
            "city": "Albuquerque",
            "zip_code": "87102",
            "country": "US",
            "state": "NM",
            "display_address": [
                "101 Broadway Blvd NE",
                "Albuquerque, NM 87102"
            ]
        },
        "phone": "+15055546175",
        "display_phone": "(505) 554-6175",
        "distance": 4947.932246988038
    },
    {
        "id": "Yx3-d3hEzMomPE5Q-Av0pA",
        "alias": "trifecta-coffee-company-albuquerque",
        "name": "Trifecta Coffee Company",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/dcWtESIAo-_oVnu0FGM_7Q/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/trifecta-coffee-company-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 241,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "bakeries",
                "title": "Bakeries"
            },
            {
                "alias": "coffeeroasteries",
                "title": "Coffee Roasteries"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 35.1367835998535,
            "longitude": -106.626495361328
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "413 Montano Rd NE",
            "address2": "Ste F",
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87107",
            "country": "US",
            "state": "NM",
            "display_address": [
                "413 Montano Rd NE",
                "Ste F",
                "Albuquerque, NM 87107"
            ]
        },
        "phone": "+15058007081",
        "display_phone": "(505) 800-7081",
        "distance": 3044.595994840179
    },
    {
        "id": "aLbjIW0aTeVPvzvIcGkjFA",
        "alias": "cutbow-coffee-roastology-albuquerque",
        "name": "Cutbow Coffee Roastology",
        "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/IDxr_5CBLTMmeCPZZWPjIQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/cutbow-coffee-roastology-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 241,
        "categories": [
            {
                "alias": "coffeeroasteries",
                "title": "Coffee Roasteries"
            },
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            }
        ],
        "rating": 5,
        "coordinates": {
            "latitude": 35.107347727896,
            "longitude": -106.670928150415
        },
        "transactions": [
            "delivery"
        ],
        "price": "$$",
        "location": {
            "address1": "1208 Rio Grande Blvd NW",
            "address2": "",
            "address3": null,
            "city": "Albuquerque",
            "zip_code": "87104",
            "country": "US",
            "state": "NM",
            "display_address": [
                "1208 Rio Grande Blvd NW",
                "Albuquerque, NM 87104"
            ]
        },
        "phone": "+15053555563",
        "display_phone": "(505) 355-5563",
        "distance": 5990.5115109182925
    },
    {
        "id": "7-fSD6UW5zsgFkXUFE5W1Q",
        "alias": "the-daily-grind-albuquerque-2",
        "name": "The Daily Grind",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/R-hsy0ZMNxtf7KSOp3H5hQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/the-daily-grind-albuquerque-2?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 208,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "tradamerican",
                "title": "American (Traditional)"
            },
            {
                "alias": "breakfast_brunch",
                "title": "Breakfast & Brunch"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 35.1047219506085,
            "longitude": -106.596717618543
        },
        "transactions": [
            "delivery"
        ],
        "price": "$$",
        "location": {
            "address1": "4360 Cutler Ave",
            "address2": "Ste C",
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87110",
            "country": "US",
            "state": "NM",
            "display_address": [
                "4360 Cutler Ave",
                "Ste C",
                "Albuquerque, NM 87110"
            ]
        },
        "phone": "+15058838310",
        "display_phone": "(505) 883-8310",
        "distance": 1440.4350359599916
    },
    {
        "id": "A7kZPmAkSitxqYHI1lmCjQ",
        "alias": "little-bear-coffee-albuquerque",
        "name": "Little Bear Coffee",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/8FL6zcp1lpDUA-aHLiZghA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/little-bear-coffee-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 251,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 35.1107630209977,
            "longitude": -106.559432986404
        },
        "transactions": [
            "delivery"
        ],
        "price": "$$",
        "location": {
            "address1": "2632 Pennsylvania St NE",
            "address2": "",
            "address3": null,
            "city": "Albuquerque",
            "zip_code": "87110",
            "country": "US",
            "state": "NM",
            "display_address": [
                "2632 Pennsylvania St NE",
                "Albuquerque, NM 87110"
            ]
        },
        "phone": "+15059178902",
        "display_phone": "(505) 917-8902",
        "distance": 4247.874373715413
    },
    {
        "id": "FsHJUfVV2mE8rB6TCnyNpQ",
        "alias": "ihatov-bread-and-coffee-albuquerque",
        "name": "Ihatov Bread and Coffee",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/iT2PFeIZOsSraV5Qi5PnqQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/ihatov-bread-and-coffee-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 77,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "bakeries",
                "title": "Bakeries"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 35.079752,
            "longitude": -106.606804
        },
        "transactions": [
            "delivery"
        ],
        "location": {
            "address1": "3400 Central Ave SE",
            "address2": "",
            "address3": null,
            "city": "Albuquerque",
            "zip_code": "87106",
            "country": "US",
            "state": "NM",
            "display_address": [
                "3400 Central Ave SE",
                "Albuquerque, NM 87106"
            ]
        },
        "phone": "",
        "display_phone": "",
        "distance": 3950.370753604787
    },
    {
        "id": "6TRguKaSS2Tda-CIA5wbsA",
        "alias": "napoli-coffee-albuquerque",
        "name": "Napoli Coffee",
        "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/MNxt1v0XUdK7bXfmoD3D1g/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/napoli-coffee-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 160,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "sandwiches",
                "title": "Sandwiches"
            },
            {
                "alias": "breakfast_brunch",
                "title": "Breakfast & Brunch"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 35.1093900011873,
            "longitude": -106.610571406782
        },
        "transactions": [
            "delivery"
        ],
        "price": "$",
        "location": {
            "address1": "3035 Menaul Blvd NE",
            "address2": null,
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87107",
            "country": "US",
            "state": "NM",
            "display_address": [
                "3035 Menaul Blvd NE",
                "Albuquerque, NM 87107"
            ]
        },
        "phone": "+15058845454",
        "display_phone": "(505) 884-5454",
        "distance": 790.8586294369418
    },
    {
        "id": "J6-zWf2f6p1qqEZW5V7AAA",
        "alias": "castle-coffee-albuquerque-3",
        "name": "Castle Coffee",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/WROZaL49Xs4Y8u8TDBCqyQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/castle-coffee-albuquerque-3?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 94,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            }
        ],
        "rating": 5,
        "coordinates": {
            "latitude": 35.08763,
            "longitude": -106.65529
        },
        "transactions": [],
        "price": "$",
        "location": {
            "address1": "727 Tijeras Ave NW",
            "address2": null,
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87102",
            "country": "US",
            "state": "NM",
            "display_address": [
                "727 Tijeras Ave NW",
                "Albuquerque, NM 87102"
            ]
        },
        "phone": "+15055085271",
        "display_phone": "(505) 508-5271",
        "distance": 5454.540444042318
    },
    {
        "id": "cuoWAnVbYkp9aqBosJlgdA",
        "alias": "limonata-albuquerque-2",
        "name": "Limonata",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/dflSg23xzkzKUiAGmKXZMQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/limonata-albuquerque-2?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 172,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "juicebars",
                "title": "Juice Bars & Smoothies"
            },
            {
                "alias": "creperies",
                "title": "Creperies"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 35.0789351,
            "longitude": -106.6091516
        },
        "transactions": [
            "delivery"
        ],
        "price": "$$",
        "location": {
            "address1": "3222 Silver Ave SE",
            "address2": "",
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87106",
            "country": "US",
            "state": "NM",
            "display_address": [
                "3222 Silver Ave SE",
                "Albuquerque, NM 87106"
            ]
        },
        "phone": "+15052660607",
        "display_phone": "(505) 266-0607",
        "distance": 4053.8461527971544
    },
    {
        "id": "X49ZNg98FM6YeKqCXU2L-Q",
        "alias": "kaps-coffee-shop-and-diner-albuquerque",
        "name": "Kap's Coffee Shop and Diner",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/jxn4Dwy0x561U-KA8HMekw/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/kaps-coffee-shop-and-diner-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 161,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "breakfast_brunch",
                "title": "Breakfast & Brunch"
            },
            {
                "alias": "diners",
                "title": "Diners"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 35.077527,
            "longitude": -106.581588
        },
        "transactions": [
            "delivery"
        ],
        "price": "$",
        "location": {
            "address1": "5801 Central Ave SE",
            "address2": "",
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87108",
            "country": "US",
            "state": "NM",
            "display_address": [
                "5801 Central Ave SE",
                "Albuquerque, NM 87108"
            ]
        },
        "phone": "+15052329658",
        "display_phone": "(505) 232-9658",
        "distance": 4746.070034144997
    },
    {
        "id": "pPYB5x2SbVbrbQ25wNacIw",
        "alias": "chocolatedude-albuquerque-3",
        "name": "ChocolateDude",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/7zJzcke77oCi6bTdmVEtYg/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/chocolatedude-albuquerque-3?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 186,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "chocolate",
                "title": "Chocolatiers & Shops"
            },
            {
                "alias": "macarons",
                "title": "Macarons"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 35.0805,
            "longitude": -106.60765
        },
        "transactions": [
            "delivery"
        ],
        "price": "$",
        "location": {
            "address1": "3339 Central Ave NE",
            "address2": "Ste E",
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87106",
            "country": "US",
            "state": "NM",
            "display_address": [
                "3339 Central Ave NE",
                "Ste E",
                "Albuquerque, NM 87106"
            ]
        },
        "phone": "+15056395502",
        "display_phone": "(505) 639-5502",
        "distance": 3878.59188881871
    },
    {
        "id": "N4cy3_RasVY12xPdPGeI8A",
        "alias": "abq-burrito-albuquerque",
        "name": "ABQ Burrito",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/Haxqx4nIwpxA55jsshw4Zw/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/abq-burrito-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 48,
        "categories": [
            {
                "alias": "mexican",
                "title": "Mexican"
            },
            {
                "alias": "breakfast_brunch",
                "title": "Breakfast & Brunch"
            },
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 35.1162492149,
            "longitude": -106.613605387
        },
        "transactions": [
            "pickup",
            "delivery"
        ],
        "location": {
            "address1": "2930 Candelaria Rd NE",
            "address2": null,
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87107",
            "country": "US",
            "state": "NM",
            "display_address": [
                "2930 Candelaria Rd NE",
                "Albuquerque, NM 87107"
            ]
        },
        "phone": "+15056395528",
        "display_phone": "(505) 639-5528",
        "distance": 717.3633999902028
    },
    {
        "id": "ENXg3w0Ra2rPoa3_3t7cCA",
        "alias": "duggans-coffee-albuquerque",
        "name": "Duggan's Coffee",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/C6394v_ZeSeKEMlHogdJhg/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/duggans-coffee-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gtw0huIWlUOiqWb7M4oBqQ",
        "review_count": 88,
        "categories": [
            {
                "alias": "coffee",
                "title": "Coffee & Tea"
            },
            {
                "alias": "breakfast_brunch",
                "title": "Breakfast & Brunch"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 35.0775061,
            "longitude": -106.6217256
        },
        "transactions": [
            "delivery"
        ],
        "price": "$",
        "location": {
            "address1": "2227 Lead Ave SE",
            "address2": "",
            "address3": "",
            "city": "Albuquerque",
            "zip_code": "87106",
            "country": "US",
            "state": "NM",
            "display_address": [
                "2227 Lead Ave SE",
                "Albuquerque, NM 87106"
            ]
        },
        "phone": "+15053127257",
        "display_phone": "(505) 312-7257",
        "distance": 4437.298457022693
    }
]