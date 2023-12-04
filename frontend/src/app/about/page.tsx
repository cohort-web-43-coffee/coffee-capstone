import {PrimarySection, SecondarySection} from '@/components/Section'
import {Container} from '@/components/Container'
import {Form, FormButton, FormInput, FormTextArea} from '@/components/Form'
import Link from 'next/link'
import Image from 'next/image'


type AboutUsCardProps = {
    name: string
    linkedIn: string
    gitHub: string
    image: string
}

export default async function AboutPage() {
    return (
        <>
            <PrimarySection>
                <Container autoMargins>
                    <AboutUsHeader/>
                    <section className={'container mx-auto grid grid-cols-2 justify-items-center gap-10 my-12'}>
                        <AboutUsCard name={'Bob'} image={'/profile/bob.jpg'}  gitHub={'https://github.com/inhaledesign'}
                                     linkedIn={'https://www.linkedin.com/in/inhale-design/'}/>
                        <AboutUsCard name={'Victor'} image={'/profile/victor.jpg'}  gitHub={'https://github.com/vicvilla6'}
                                     linkedIn={'https://www.linkedin.com/in/victor-villa-098330292/'}/>
                        <AboutUsCard name={'Josh'} image={'/profile/josh.jpg'}  gitHub={'https://github.com/JoshuaYu2023'}
                                     linkedIn={'https://www.linkedin.com/in/joshua-yu-993887289/'}/>
                        <AboutUsCard name={'Mariposa'} image={'/profile/mariposa.jpg'}  gitHub={' https://github.com/mariposawheat'}
                                     linkedIn={'https://www.linkedin.com/in/mariposa-wheat-331763243/'}/>
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
             <div className={'sm:text-sm'} style={{ margin: 'auto', width: '50%' }}>
                <div className={'sm:text-accent md:text-accent md:prose'}>
                    <h1 className={'sm:text-accent md:text-accent'}>About Us!</h1>
                    <p>This website was the group project created by Valid Coffee in Cohort 43 of CNM Ingenuity Deep Dive Fullstack Web development course. Bob, Victor, Mariposa, and Josh, (that's us), created this website so that the coffee drinkers of Albuquerque can have a smooth experience in finding the perfect cup of coffee! We streamlined the process by taking long reviews and turning them into simply tags.<br/>To find out more about the other projects we've made, see the links below! Thank you for using Valid Coffee! Hope your next cup of coffee is what you're looking for!</p>
                </div>
             </div>
        </div>

    )
}

function AboutUsCard ({name, linkedIn, gitHub, image}: Readonly<AboutUsCardProps>) {
    return (
        <div>
            <Image src={image} alt={`Profile photo of ${name}`} width={100} height={100} className={'rounded-full w-28 h-28 md:h-52 md:w-52'}/>
            <p>Check {name} out on <Link href={linkedIn} className={'link'}>LinkedIn</Link> and <Link href={gitHub} className={'link'}>GitHub!</Link></p>
        </div>
    )
}

function ContactForm () {
    return (
        <div>
            <div style={{margin: 'auto', width: '50%'}}>
                <div className={'prose'}>
                    <h1>Contact Us</h1>
                </div>
            </div>
            <Form id='contact-form'>
                <FormInput label={'Name'} type={'text'} id={'name'} name={'name'} placeholder={'ex.Agent Smith'}/>
                <FormInput label={'Email'} type={'email'} id={'email'} name={'email'} placeholder={'Smith@example.com'}/>
                <FormTextArea label={'Message'} id={'message'} name={'message'} placeholder={'Enter message max 250'}
                              rows={3}/>
                <FormButton/>
            </Form>
        </div>
    )
}