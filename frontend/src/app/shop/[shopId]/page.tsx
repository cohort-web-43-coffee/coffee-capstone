import {PrimarySection} from '@/components/Section'
import React from 'react'
import {Container, PrimaryContainer} from '@/components/Container'
import {BookmarkToggle, TagToggleList} from '@/app/shop/[shopId]/page.client'
import {getRestData} from "@/utils/fetchHeaders"
import {getSession} from '@/utils/fetchSession'
import {CustomLink} from '@/components/CustomLink.client'


type ShopPageProps = {
    params: { shopId: string }
}

export default async function ShopPage ({params}: Readonly<ShopPageProps>) {
    const {shopId} = params
    const session = await getSession()
    const shopData = await getRestData(`/apis/shop/shopId/${shopId}`)
    const tagData = await getRestData(`/apis/tag/shopTags/${shopId}`)
    return (
        <PrimarySection>
            <PrimaryContainer>
                <div className={'grid cols-1 justify-items-center gap-4'}>

                    <img src={shopData.shopPhotoUrl} alt={shopData.shopName}
                         className={'w-auto h-auto aspect-square sm:w-60 md:w-80 lg:w-96 sm:rounded-xl'}/>
                    <h1 className={'text-4xl text-primary-container drop-shadow-lg'}>{shopData?.shopName}<BookmarkToggle
                        shopId={shopId} session={session}/></h1>
                    <p className={'font-bold text-accent'}>Address: {shopData?.shopAddress}<br/>Phone Number: {shopData?.shopPhoneNumber}</p>
                    <CustomLink href={`/gallery/${shopId}`}>
                        <button className={'btn self-center'}>
                            <img src={'/photo_icon.svg'} alt={'Gallery button'}/>Gallery
                        </button>
                    </CustomLink>
                    <TagToggleList tagData={tagData} shopId={shopId} session={session}/>

                </div>
            </PrimaryContainer>
        </PrimarySection>
    )
}