import React from 'react'
import {BookmarkToggle, TagToggleList} from '@/app/shop/[shopId]/page.client'
import {getRestData} from '@/utils/fetchHeaders'
import {getSession} from '@/utils/fetchSession'
import {CustomLink} from '@/components/CustomLink.client'
import {GallerySVG} from '@/components/SVG'
import {Section} from '@/components/Section'


type ShopPageProps = {
    params: { shopId: string }
}

export default async function ShopPage ({params: {shopId}}: Readonly<ShopPageProps>) {
    const session = await getSession()
    const shopData = await getRestData(`/apis/shop/${shopId}`)

    return (
        <Section>
            <div className="hero min-h-[40vh]" style={{backgroundImage: `url(${shopData?.shopPhotoUrl})`}}>
                <div className="hero-overlay bg-opacity-60"/>
                <div className="hero-content text-center text-neutral-content grid grid-rows-[auto_12px]">
                    <div className='max-w-md'>
                        <h1 className={'text-4xl text-primary-container drop-shadow-lg flex items-center justify-center'}>
                            {shopData?.shopName}
                        </h1>
                        <p className={'font-bold drop-shadow-md text-accent text-center'}>{shopData?.shopAddress}<br/>{shopData?.shopPhoneNumber}
                        </p>
                    </div>
                    <div>
                        <CustomLink href={`${shopId}/gallery`}>
                            <GallerySVG className={'fill-primary'}/>
                        </CustomLink>
                        <BookmarkToggle shopId={shopId} session={session}/>
                    </div>
                </div>
            </div>
            <div className={'grid cols-1 justify-items-center gap-4'}>
                <TagToggleList shopId={shopId} session={session}/>
            </div>
        </Section>
    )
}