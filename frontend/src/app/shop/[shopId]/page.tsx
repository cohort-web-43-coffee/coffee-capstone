import {PrimarySection} from '@/app/components/Section'
import React from 'react'
import {Container} from '@/app/components/Container'
import {ImageProps} from '@/app/types/Props'
import {getRestData} from "@/app/utils/fetch"
import {TagToggleList} from '@/app/shop/[shopId]/page.client'
import {getSession} from '@/utils/fetchSession'
import { unstable_noStore as noStore } from 'next/cache';


export default async function ShopPage ({params}: { params: { shopId: string } }) {

    const {shopId} = params
    const session = await getSession()
    const shopData = await getRestData(`/apis/shop/shopId/${shopId}`)
    const photoData = await getRestData(`/apis/photo/photoByShopId/${shopId}`)
    const tagData = await getRestData(`/apis/tag/shopTags/${shopId}`)
    // const accountActiveTagData = await getRestData(`/apis/activeTag/activeTagsByShopId/${shopId}`, session)
    // console.log('Data:', accountActiveTagData)

    const brewingTags = {
        group: 'Brewing',
        tags: tagData.filter((tag: any) => tag.tagGroup === 'brewing')
    }
    const busyTags = {
        group: 'Busy Times',
        tags: tagData.filter((tag: any) => tag.tagGroup === 'busy')
    }
    const serviceTags = {
        group: 'Service',
        tags: tagData.filter((tag: any) => tag.tagGroup === 'service')
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
                        <div className={'prose'}><h1>{shopData.shopName}</h1></div>
                        <div className={'prose'}><p className={'font-bold'}>Address: {shopData.shopAddress}</p></div>
                        <div className={'prose'}><p className={'font-bold'}>Phone Number: {shopData.shopPhoneNumber}</p>
                        </div>
                        {
                            session
                                ? <>
                                    <TagToggleList group={brewingTags} shopId={shopId} session={session}/>
                                    <TagToggleList group={serviceTags} shopId={shopId} session={session}/>
                                    <TagToggleList group={busyTags} shopId={shopId} session={session}/>
                            </>
                                : <></>
                        }
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