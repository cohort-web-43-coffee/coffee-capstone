"use client"
import {ContactForm} from "@/app/components/ContactForm";
import {PrimarySection, SecondarySection} from '@/app/components/Sections'
import {Container} from '@/app/components/Container'

export default function AboutPage() {
    return (
        <>
            <PrimarySection>
                <Container autoMargins>
                    <AboutUs/>
                </Container>
            </PrimarySection>

            <SecondarySection>
                <Container autoMargins>
                    <ContactForm/>
                </Container>

            </SecondarySection>
        </>
    )
}

function AboutUs () {
    return (
        <div className="basis-5/6 max-md:px-8">
            <h1 className="text-6x md:text-6xl">About Us!</h1>
            <p>Lucio fulci tremor est dark vivos magna. Expansis creepy arm yof darkness ulnis witchcraft missing carnem
                armis Kirkman Moore and Adlard caeruleum in locis. Romero morbo Congress amarus in auras. Nihil horum
                sagittis tincidunt, zombie slack-jawed gelida survival portenta.</p>
        </div>

    )
}