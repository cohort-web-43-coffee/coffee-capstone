"use client"
import {ContactForm} from "@/app/components/ContactForm";
import {AboutUs} from "@/app/components/AboutUs";
import {PrimarySection, SecondarySection} from '@/app/components/Sections'
import {Container} from '@/app/components/Container'

export default function () {
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