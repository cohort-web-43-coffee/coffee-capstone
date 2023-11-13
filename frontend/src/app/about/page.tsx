import {PrimarySection, SecondarySection} from '@/app/components/Section'
import {Container} from '@/app/components/Container'
import {Form, FormButton, FormInput, FormTextArea} from '@/app/components/Form'
import Link from "next/link";
import Image from "next/image";



type AboutUsCardProps = {
    name: string
    linkedIn: string
    gitHub: string
}

export default function AboutPage() {
    return (
        <>
            <PrimarySection>
                <Container autoMargins>
                    <AboutUsHeader/>
                    <section className={'container mx-auto grid grid-cols-2 justify-items-center gap-y-10 my-12'}>
                        <AboutUsCard name={'Bob'} gitHub={'https://github.com/inhaledesign'} linkedIn={'https://www.linkedin.com/in/inhale-design/'}/>
                        <AboutUsCard name={'Victor'} gitHub={'https://github.com/vicvilla6'} linkedIn={'https://www.linkedin.com/in/victor-villa-098330292/'}/>
                        <AboutUsCard name={'Josh'} gitHub={'https://github.com/JoshuaYu2023'} linkedIn={'https://www.linkedin.com/in/joshua-yu-993887289/'}/>
                        <AboutUsCard name={'Mariposa'} gitHub={' https://github.com/mariposawheat'} linkedIn={'https://www.linkedin.com/in/mariposa-wheat-331763243/'}/>
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
                <div className={'prose text-accent'}>
                    <h1 className={'text-accent'}>About Us!</h1>
                    <p>This website was the group project created by Valid Coffee in Cohort 43 of CNM Ingenuity Deep Dive Fullstack Web development course. Bob, Victor, Mariposa, and Josh, (that's us), created this website so that the coffee drinkers of Albuquerque can have a smooth experience in finding the perfect cup of coffee. We wanted to streamline the long review process that has become the norm, and make it easier to find you want by using tags instead of paragraph reviews. We also put all the coffee shops in one place, making it easier to find instead of having to search through Google Maps and Yelp.<br/>To find out more about the other projects we've made, see the links below! Please use the contact form if you'd like to get in touch with us about any suggestions, comments, concerns, or queries. Thank you for using Valid Coffee! Hope your next cup of coffee is what you're looking for!</p>
                </div>
             </div>
        </div>

    )
}

function AboutUsCard ({name, linkedIn, gitHub}: AboutUsCardProps) {
    return (
        <div>
            <img src={`https://picsum.photos/id/30/300/300`} alt={'picture of developers'} className={'rounded-full h-52 w-52'}/>
            <p>Check {name} out on <Link href={linkedIn}>LinkedIn</Link> and <Link href={gitHub}>GitHub!</Link></p>
        </div>
    )
}

export function ContactForm () {
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