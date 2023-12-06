import {PrimarySection} from '@/components/Section'
import React from 'react'
import {Container, PrimaryContainer} from '@/components/Container'
import {BookmarkToggle, TagToggleList} from '@/app/shop/[shopId]/page.client'
import {getRestData} from '@/utils/fetchHeaders'
import {getSession} from '@/utils/fetchSession'
import {CustomLink} from '@/components/CustomLink.client'
import {GallerySVG} from '@/components/SVG'


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
                <div className="hero min-h-[40vh]" style={{backgroundImage: `url(${shopData.shopPhotoUrl})`}}>
                    <div className="hero-overlay bg-opacity-60"/>
                    <div className="hero-content text-center text-neutral-content grid grid-rows-[auto_12px]">
                        <div className="max-w-md">
                            <h1 className={'text-4xl text-primary-container drop-shadow-lg flex items-center justify-center'}>
                                {shopData?.shopName}
                            </h1>
                            <p className={'font-bold text-accent text-center'}>{shopData?.shopAddress}<br/>{shopData?.shopPhoneNumber}
                            </p>

                        </div>
                        <div>
                            <CustomLink href={`/gallery/${shopId}`}>
                                <GallerySVG className={'fill-primary'}/>
                            </CustomLink>
                            <BookmarkToggle shopId={shopId} session={session}/>

                        </div>
                    </div>
                </div>
                <div className={'grid cols-1 justify-items-center gap-4'}>


                    <TagToggleList tagData={tagData} shopId={shopId} session={session}/>

                </div>
            </PrimaryContainer>
        </PrimarySection>
    )
}