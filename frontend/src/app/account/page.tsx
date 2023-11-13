import {PrimarySection, SecondarySection} from '@/app/components/Section'
import {Container} from '@/app/components/Container'
import {Card, CardBody, CardImage, CardTitle} from '@/app/components/Card'
import {PageProps} from "@/app/types/Props";
import {MenuButton, MenuContent, SearchField, SiteTitle} from "@/app/layout/NavBar";
import Link from "next/link";
import {SignInModal, SignUpModal} from "@/app/layout/SignUpModal";
import {getRestData} from "@/app/utils/fetch";


type BookmarkCardProps = {
    name: string
    address: string
    phone: string
    pixels: number
}

export default async function AccountPage({searchParams}: PageProps) {
    // const shopData = await getShopData(params.shopId)
    // const photoData = await getPhotoData(params.shopId)
    const query = searchParams.q
    const searchResult = await getRestData(`/apis/shop/search?name=${query}`)
    return (
        <>
            <nav className={'navbar'}>
                <div className={'dropdown'}>
                    <MenuButton/>
                    <ul className={'menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-32'}>
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
                        <ul className={'menu menu-horizontal px-1'}>
                            <MenuContent/>
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
                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-12 justify-items-center'}>
                        <BookmarkCard
                            name={"Last Drop Espresso Bar"}
                            address={"3759 Goldleaf Lane, Rochelle Park, NJ 07662"}
                            phone={"676-153-3448"}
                            pixels={300}/>
                        <BookmarkCard
                            name={"Roasted Bean Diner"}
                            address={"1662 West Street, Grand Rapids, MI 49505"}
                            phone={"436-012-1060"}
                            pixels={300}/>
                        <BookmarkCard
                            name={"Lava Java Cafe"}
                            address={"2031 New Creek Road, Huntsville, AL 35810"}
                            phone={"857-850-1659"}
                            pixels={300}/>
                        <BookmarkCard
                            name={"Yin & Yang Tearoom"}
                            address={"40 Ross Street, Allendale, IL 62410"}
                            phone={"747-454-3245"}
                            pixels={300}/>
                        <BookmarkCard
                            name={"Cool Beans Barista"}
                            address={"2391 Barnum Road, New York, NY 10004"}
                            phone={"054-155-4886"}
                            pixels={300}/>
                        <BookmarkCard
                            name={"Last Drop Coffee Shop"}
                            address={"2479 Leo Street, Tarentum, PA 15084"}
                            phone={"813-728-4945"}
                            pixels={300}/>
                        <BookmarkCard
                            name={"Hot Shots Cafeteria"}
                            address={"2201 Centennial Farm Road, Earling, IA 51530"}
                            phone={"485-099-3502"}
                            pixels={300}/>
                        <BookmarkCard
                            name={"Little Big Brews Cafe"}
                            address={"4776 Wilkinson Street, Springfield, TN 37172"}
                            phone={"262-523-5327"}
                            pixels={300}/>
                    </div>
                </Container>
            </SecondarySection>
        </>
    )
}

function BookmarkCard({name, address, phone, pixels}: BookmarkCardProps) {
    const id = Math.floor(Math.random() * 1084)
    return (
        <Card>
            <CardImage imageUrl={`https://picsum.photos/id/${id}/${pixels}/${pixels}`} imageAlt={'picture'}/>
            <CardBody>
                <div className={"flex"}>
                    <ul>
                        <li className={"container p-4"}>{name}</li>
                        <li className={"container p-4"}>{address}</li>
                        <li className={"container p-4"}>{phone}</li>
                        <li className={"btn btn-secondary text-secondary-content rounded-lg"}>Delete Bookmark</li>
                    </ul>
                </div>
            </CardBody>
        </Card>
    )
}

function AccountCard() {
    return (<>
            <Card>
                <div className={'place-self-center'}>
                    <CardTitle>Account</CardTitle>
                </div>
                <CardBody>
                    <div className={'grid grid-cols-2 justify-items-center'}>
                        <h1 className={'text-lg'}>NAME:</h1><p>Frederick Douglas</p>
                        <h1 className={'text-lg'}>EMAIL:</h1><p>fakeemail@realemail.com</p>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}