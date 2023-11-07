'use client'

import {PrimarySection} from '@/app/components/Section'
import React from 'react'
import {Container} from '@/app/components/Container'
import {busyTags, customTags, drinkTags} from '@/app/mocks/tags'
import {TagList} from '@/app/components/Tag'
import {NewTagButton} from '@/app/components/NewTagModal'
import {useParams} from 'next/navigation'
import {ImageProps} from '@/app/types/Props'

const mockShopDetails = {
    "status": 200,
    "message": null,
    "data": {
        "shopId": "a308a0f3-1550-4f5f-b638-9e9670a3a2e9",
        "shopAddress": "573 Commercial St NE\nAlbuquerque, NM 87102",
        "shopName": "Villa Myriam Roasting",
        "shopPhoneNumber": "(505) 336-5652",
        "shopUrl": "https://www.yelp.com/biz/villa-myriam-roasting-albuquerque?adjust_creative=gtw0huIWlUOiqWb7M4oBqQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=gtw0huIWlUOiqWb7M4oBqQ"
    }
}

const mockPhotoDetails = {
    "status": 200,
    "message": null,
    "data": [
        {
            "photoId": "62dc1458-f6eb-4cac-9a51-e84b0cee5488",
            "photoShopId": "a308a0f3-1550-4f5f-b638-9e9670a3a2e9",
            "photoCredit": "",
            "photoDescription": "",
            "photoOrder": 0,
            "photoUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/kRNzeJNjxPo5A9ti7bnNmw/o.jpg"
        },
        {
            "photoId": "8b92753f-ee6d-4e8e-b8e8-c16337ea7711",
            "photoShopId": "a308a0f3-1550-4f5f-b638-9e9670a3a2e9",
            "photoCredit": "",
            "photoDescription": "",
            "photoOrder": 1,
            "photoUrl": "https://s3-media4.fl.yelpcdn.com/bphoto/q6B8HF2KFnt1kwCmxg9Z0Q/o.jpg"
        },
        {
            "photoId": "f3d8901c-9912-4c7e-ad39-e846f723b3c7",
            "photoShopId": "a308a0f3-1550-4f5f-b638-9e9670a3a2e9",
            "photoCredit": "",
            "photoDescription": "",
            "photoOrder": 2,
            "photoUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/DK7xbqZAIyyMVpwJhcmWlQ/o.jpg"
        }
    ]
}



export default function ShopPage () {
    const params = useParams()
    console.log(params)
    return <>
        <PrimarySection>
            <Container autoMargins>
                <div
                    className="mx-full p-5 bg-primary-container-variant flex-row justify-center grid grid-cols-[1fr_2fr] gap-3">
                    <div className={'flex flex-col gap-2'}>
                        { mockPhotoDetails.data.map((photoDetails) => {
                            return <ShopDetailImage imageUrl={photoDetails.photoUrl} imageAlt={`Photograph of ${mockShopDetails.data.shopName}`}/>
                        })}
                    </div>
                    <div className={'flex flex-col items-center justify-center'}>
                        <div className={'prose'}><h1>Bear Cafe</h1></div>
                        <TagSection/>
                    </div>
                </div>
            </Container>
        </PrimarySection>
    </>
}


function ShopDetailImage ({imageUrl, imageAlt}: ImageProps) {
    return (
        <img src={imageUrl} alt={imageAlt}/>
    )
}
function TagSection () {
    return (<>
            <TagList group={customTags} showCounts>
                <NewTagButton/>
            </TagList>
            <TagList group={drinkTags} showCounts/>
            <TagList group={busyTags} showCounts/>
        </>
    )
}