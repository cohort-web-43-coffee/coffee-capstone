"use server"
import {PrimarySection, SecondarySection} from '@/app/components/Section'
import {Container} from '@/app/components/Container'
import {CardBody, CardTitle, MediumCard} from '@/app/components/Card'
import {PageProps} from "@/app/types/Props"
import {MenuButton, MenuContent, SearchField, SiteTitle} from "@/app/layout/NavBar"
import Link from "next/link"
import {SignInModal, SignUpModal} from "@/app/layout/SignUpModal"
import {getRestData} from "@/app/utils/fetch"
import {getSession} from "@/utils/fetchSession";
import {BookmarkList} from "@/app/account/page.client";


export default async function AccountPage({searchParams}: PageProps) {
    const session = await getSession()
    const query = searchParams.q
    const searchResult = await getRestData(`/apis/shop/search?name=${query}`)
    return (
        <>
            <nav className={'navbar'}>
                <div className={'dropdown'}>
                    <MenuButton/>
                    <ul className={'menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-32 gap-1'}>
                        <MenuContent session={session}/>
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
                        <ul className={'relative flex items-center px-1 gap-4'}>
                            <MenuContent session={session}/>
                        </ul>
                    </div>
                </div>
                <SignUpModal/>
                <SignInModal/>
            </nav>
            <PrimarySection>
                <Container autoMargins>
                    <div className={'flex justify-center'}>
                        <AccountCard/>
                    </div>
                </Container>
            </PrimarySection>

            <SecondarySection>
                <Container autoMargins>
                    <BookmarkList session={session}/>
                </Container>
            </SecondarySection>
        </>
    )
}


function AccountCard() {
    return (
        <>
            <MediumCard>
                <div className={'place-self-center'}>
                    <CardTitle>Account</CardTitle>
                </div>
                <CardBody>
                    <div className={'grid grid-cols-2 justify-items-center'}>
                        <h1 className={'text-lg'}>NAME:</h1><p>Frederick Douglas</p>
                        <h1 className={'text-lg'}>EMAIL:</h1><p>fakeemail@realemail.com</p>
                    </div>
                </CardBody>
            </MediumCard>
        </>
    )
}
