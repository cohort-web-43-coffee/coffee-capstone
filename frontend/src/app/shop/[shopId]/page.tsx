import {PrimarySection} from '@/app/components/Section'
import React from 'react'
import {Container} from '@/app/components/Container'
import {busyTags, customTags, drinkTags} from '@/app/mocks/tags'
import {TagList} from '@/app/components/Tag'
import {NewTagButton} from '@/app/components/NewTagModal'
import {ImageProps} from '@/app/types/Props'
import {getRestData} from "@/app/utils/fetch";



export default async function ShopPage({params}: { params: { shopId: string } }) {
    const shopData = await getShopData(params.shopId)
    const photoData = await getPhotoData(params.shopId)
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
                        <div className={'prose'}><h1>{shopData.shopName}</h1></div>
                        <div className={'prose'}><p className={'font-bold'}>Address: {shopData.shopAddress}</p></div>
                        <div className={'prose'}><p className={'font-bold'}>Phone Number: {shopData.shopPhoneNumber}</p></div>
                        <TagSection/>
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

function TagSection() {
    return (<>
            <TagList group={customTags} showCounts>
                <NewTagButton/>
            </TagList>
            <TagList group={drinkTags} showCounts/>
            <TagList group={busyTags} showCounts/>
        </>
    )
}

async function getPhotoData(shopId: string) {
    const endpoint = `/photo/photoByShopId/${shopId}`
    return await getRestData(endpoint)
}

async function getShopData(shopId: string) {
    const endpoint = `/shop/shopId/${shopId}`
    return await getRestData(endpoint)
}
