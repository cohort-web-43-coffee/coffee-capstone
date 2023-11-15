import {PrimarySection} from '@/app/components/Section'
import React from 'react'
import {Container} from '@/app/components/Container'
import {TagToggleList} from '@/app/shop/[shopId]/page.client'
import {ImageProps, PageProps} from '@/app/types/Props'
import {getRestData} from "@/app/utils/fetch"
import {MenuButton, MenuContent, SearchField, SiteTitle} from "@/app/layout/NavBar"
import Link from "next/link"
import {SignInModal, SignUpModal} from "@/app/layout/SignUpModal"
import {getSession} from '@/utils/fetchSession'


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
    const searchResult = await getRestData(`/apis/shop/search?name=${query}`)

    return <>
        <nav className={'navbar'}>
            <div className={'dropdown'}>
                <MenuButton/>
                <ul className={'menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-32 gap-1'}>
                    <MenuContent/>
                </ul>
            </div>
            <div className={'flex-1'}>
                <SiteTitle/>
            </div>
            <div className={'flex-none'}>
                Search:&nbsp;
                <div className={'dropdown'}>
                    <SearchField initialText={query}>
                        <div tabIndex={0}>
                            <ul tabIndex={0}
                                className={'dropdown-content z-10 menu grid p-2 shadow bg-base-100 rounded-box sm:w-40 md:w-52 max-h-52 overflow-y-auto gap-4'}>
                                {searchResult.length > 0 ? searchResult.map((shop: any) => <Link
                                        href={`/shop/${shop.shopId}`}>
                                        <li key={shop.shopId}>{shop.shopName}</li>
                                    </Link>) :
                                    <p>No Results</p>}
                            </ul>
                        </div>
                    </SearchField>
                </div>
                <div className={'navbar-center hidden md:flex'}>
                    <ul className={'menu menu-horizontal px-1 gap-1'}>
                        <MenuContent/>
                    </ul>
                </div>
            </div>
            <SignUpModal/>
            <SignInModal/>
        </nav>
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
                        <div className={'prose'}><h1
                            className={'text-primary-container drop-shadow-lg'}>{shopData.shopName}</h1></div>
                        <div className={'prose'}><p
                            className={'font-bold text-accent drop-shadow-lg pl-2'}>Address: {shopData.shopAddress}</p>
                        </div>
                        <div className={'prose'}><p className={'font-bold text-accent drop-shadow-lg'}>Phone
                            Number: {shopData.shopPhoneNumber}</p></div>
                        <div
                            className={"my-4 btn btn-xs sm:btn sm:btn-sm md:btn lg:btn btn-primary sm:btn-primary md:btn-primary lg:btn-primary text-secondary-content rounded-lg p-1 sm:p-1 md:p-2 lg:p-2"}>Add
                            Bookmark
                        </div>

                    <TagToggleList tagData={tagData} shopId={shopId} session={session}/>
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