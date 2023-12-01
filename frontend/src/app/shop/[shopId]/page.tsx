import {PrimarySection} from '@/app/components/Section'
import React from 'react'
import {Container} from '@/app/components/Container'
import {TagToggleList} from '@/app/shop/[shopId]/page.client'
import {ImageProps, PageProps} from '@/app/types/Props'
import {getRestData} from "@/app/utils/fetch"
import {getSession} from '@/utils/fetchSession'
import {NavBar} from '@/app/layout/NavBar'


type ShopPageProps = PageProps & {
    params: { shopId: string }
}

export default async function ShopPage({params, searchParams}: ShopPageProps) {
    const {shopId} = params
    const session = await getSession()
    const shopData = await getRestData(`/apis/shop/shopId/${shopId}`)
    const photoData = await getRestData(`/apis/photo/photoByShopId/${shopId}`)
    const tagData = await getRestData(`/apis/tag/shopTags/${shopId}`)
    const query = searchParams.q

    return <>
        <NavBar query={query} session={session}/>
        <PrimarySection>
            <Container autoMargins>
                <div className={"mx-full p-5 bg-primary-container-variant flex-row justify-center grid grid-cols-[1fr_2fr] gap-3"}>
                    <div>
                        <img src={shopData.shopPhotoUrl} alt={shopData.shopName} className={'w-auto h-auto sm:w-40 sm:h-40 md:w-60 md:h-60 lg:w-96 lg:h-96'}/>
                    </div>
                    <div className={'flex flex-col items-center justify-center'}>
                        <div className={'prose'}><h1
                            className={'text-primary-container drop-shadow-lg'}>{shopData.shopName}</h1></div>
                        <div className={'prose'}><p
                            className={'font-bold text-accent drop-shadow-lg px-12'}>Address: {shopData.shopAddress}</p>
                        </div>
                        <div className={'prose'}><p className={'font-bold text-accent drop-shadow-lg pr-4'}>Phone
                            Number: {shopData.shopPhoneNumber}</p></div>
                        <div
                            className={"my-4 btn btn-xs sm:btn sm:btn-sm md:btn lg:btn btn-primary sm:btn-primary md:btn-primary lg:btn-primary text-secondary-content rounded-lg p-1 sm:p-1 md:p-2 lg:p-2"}>Add
                            Bookmark
                        </div>

                        <TagToggleList tagData={tagData} shopId={shopId} session={session}/>
                    </div>
                </div>
                <div className={'mx-full p-5 bg-primary-container-variant flex flex-row gap-4 justify-center'}>
                    {photoData.map((photoDetails: any) => {
                        return <ShopDetailImage key={photoDetails.photoId} imageUrl={photoDetails.photoUrl}
                                                imageAlt={`Photograph of ${shopData.shopName}`}/>
                    })}
                </div>
                // TODO: Make the div above a gallery
            </Container>
        </PrimarySection>
    </>
}

function ShopDetailImage({imageUrl, imageAlt}: ImageProps) {
    return (
        <img src={imageUrl} alt={imageAlt} className={'w-28 h-28 sm:w-40 sm:h-40 md:w-60 md:h-60 lg:w-96 lg:h-96'}/>
    )
}