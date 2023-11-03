'use client'
import {PrimarySection, SecondarySection} from '@/app/components/Section'
import {Container} from '@/app/components/Container'
import {ContactForm} from '@/app/components/ContactForm'


type AboutUsCardProps = {
    text: string
}

export default function AboutPage() {
    return (
        <>
            <PrimarySection>
                <Container autoMargins>
                    <AboutUsHeader/>
                    <section className={'container mx-auto grid grid-cols-4 gap-24 my-16'}>
                        <AboutUsCard text={'Bob Links Here'}/>
                        <AboutUsCard text={'Victor Links Here'}/>
                        <AboutUsCard text={'Mariposa Links Here'}/>
                        <AboutUsCard text={'Josh Links Here'}/>
                    </section>
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

function AboutUsHeader () {
    return (
        <div>
             <div style={{ margin: 'auto', width: '50%' }}>
                <div className={'prose'}>
                    <h1>About Us!</h1>
                    <p>Lucio fulci tremor est dark vivos magna. Expansis creepy arm yof darkness ulnis witchcraft missing carnem
                        armis Kirkman Moore and Adlard caeruleum in locis. Romero morbo Congress amarus in auras. Nihil horum
                        sagittis tincidunt, zombie slack-jawed gelida survival portenta.</p>
                </div>
             </div>
        </div>

    )
}

function AboutUsCard ({text}: AboutUsCardProps) {
    return (
        <div>
            <img src={`https://picsum.photos/id/30/300/300`} alt={'picture of developers'} className={'rounded-full'}/>
            <p>{text}</p>
        </div>
    )
}