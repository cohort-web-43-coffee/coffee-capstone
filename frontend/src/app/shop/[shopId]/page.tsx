import {PrimarySection} from '@/app/components/Section'
import React from 'react'
import {Container} from '@/app/components/Container'
import {TagList} from '@/app/components/Tag'
import {ImageProps} from '@/app/types/Props'
import {getRestData} from "@/app/utils/fetch";



export default async function ShopPage({params}: { params: { shopId: string } }) {
    const shopData = await getShopData(params.shopId)
    const photoData = await getPhotoData(params.shopId)
    const brewingTags = {
        group: 'Brewing',
        tags: await getRestData('/apis/tag/tagGroup/brewing')
    }
    const busyTags = {
        group: 'Busy Times',
        tags: await getRestData('/apis/tag/tagGroup/busy')
    }
    const serviceTags = {
        group: 'Service',
        tags: await getRestData('/apis/tag/tagGroup/service')
    }
    return <>
        <PrimarySection>
            <Container autoMargins>
                <div
                    className="mx-full p-5 bg-primary-container-variant flex-row justify-center grid grid-cols-[1fr_2fr] gap-3">
                    <div className={'flex flex-col gap-2'}>
                        {photoData.map((photoDetails: any) => {
                            return <ShopDetailImage key={photoDetails.photoId} imageUrl={photoDetails.photoUrl}
                                                    imageAlt={`Photograph of ${shopData.shopName}`}/>
                        })}
                    </div>
                    <div className={'flex flex-col items-center justify-center'}>
                        <div className={'prose'}><h1 className={'text-accent'}>{shopData.shopName}</h1></div>
                        <div className={'prose'}><p className={'font-bold text-accent'}>Address: {shopData.shopAddress}</p></div>
                        <div className={'prose'}><p className={'font-bold text-accent'}>Phone Number: {shopData.shopPhoneNumber}</p></div>
                        <TagList group={brewingTags} showCounts/>
                        <TagList group={serviceTags} showCounts/>
                        <TagList group={busyTags} showCounts/>
                    </div>
                </div>
            </Container>
        </PrimarySection>
    </>
}

function ShopDetailImage({imageUrl, imageAlt}: ImageProps) {
    return (
        <img src={imageUrl} alt={imageAlt}/>
    )
}

async function getPhotoData(shopId: string) {
    const endpoint = `/apis/photo/photoByShopId/${shopId}`
    return await getRestData(endpoint)
}

async function getShopData(shopId: string) {
    const endpoint = `/apis/shop/shopId/${shopId}`
    return await getRestData(endpoint)
}