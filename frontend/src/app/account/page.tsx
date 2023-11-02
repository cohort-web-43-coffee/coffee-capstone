'use client'

import {NeutralSection, PrimarySection, SecondarySection} from '@/app/components/Sections'
import {Container} from '@/app/components/Container'
import {AccountCard, BookmarkCard} from '@/app/components/Card'
import {NavBar} from "@/app/components/NavBar";

export default function AccountPage () {
    return (
        <>
            <NavBar/>

            <PrimarySection>
                <Container autoMargins>
                    <div className={'flex justify-center'}>
                    <AccountCard/>
                    </div>
                </Container>
            </PrimarySection>

            <SecondarySection>
                <Container autoMargins>
                    <section className={'grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-12 justify-items-center'}>
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
                    </section>
                </Container>
            </SecondarySection>
        </>
    )
}