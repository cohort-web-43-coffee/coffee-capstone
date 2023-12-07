import {Form, FormButton, FormInput, FormTextArea} from '@/components/Form'
import Link from 'next/link'
import Image from 'next/image'
import {ClassProps, ImageProps} from '@/types/Props'
import {Card} from '@/components/Card'
import {Section} from '@/components/Section'


type AboutUsCardProps = ImageProps & ClassProps & {
    linkedIn: string
    gitHub: string
}

export default async function AboutPage () {
    return (
        <Section className={'p-4'}>
            <div className={'grid grid-cols-2 gap-4 py-4'}>
                <AboutUsCard
                    className={'justify-self-end'}
                    imageAlt={'Bob'}
                    imageUrl={'/profile/bob.jpg'}
                    gitHub={'https://github.com/inhaledesign'}
                    linkedIn={'https://www.linkedin.com/in/inhale-design/'}/>
                <AboutUsCard
                    className={'justify-self-start'}
                    imageAlt={'Victor'}
                    imageUrl={'/profile/victor.jpg'}
                    gitHub={'https://github.com/vicvilla6'}
                    linkedIn={'https://www.linkedin.com/in/victor-villa-098330292/'}/>
                <AboutUsCard
                    className={'justify-self-end'}
                    imageAlt={'Josh'}
                    imageUrl={'/profile/josh.jpg'}
                    gitHub={'https://github.com/JoshuaYu2023'}
                    linkedIn={'https://www.linkedin.com/in/joshua-yu-993887289/'}/>
                <AboutUsCard
                    className={'justify-self-start'}
                    imageAlt={'Mariposa'}
                    imageUrl={'/profile/mariposa.jpg'}
                    gitHub={' https://github.com/mariposawheat'}
                    linkedIn={'https://www.linkedin.com/in/mariposa-wheat-331763243/'}/>
            </div>
            <div className={'prose block mx-auto text-primary-variant-content'}>
                <p>Thank you for using Valid Coffee! This web app is a team capstone of the CNM Deep Dive Fullstack Web development course. We created this website to streamline the search for the perfect cup of coffee in Albuquerque, New Mexico! We hope your next cup of coffee is what you're looking for!
                </p>
                <h1>Contact Us</h1>
            </div>
            <ContactForm/>
        </Section>
    )
}


function AboutUsCard ({linkedIn, gitHub, imageAlt, imageUrl, className}: Readonly<AboutUsCardProps>) {
    return (
        <Card className={`flex items-center ${className}`}>
            <Image src={imageUrl} alt={imageAlt} width={200} height={200}
                   className={'rounded-full'}/>
            <p>{imageAlt}</p>
            <p>Check them out on <Link href={linkedIn} className={'link'}>LinkedIn</Link> and <Link href={gitHub}
                                                                                                    className={'link'}>GitHub!</Link>
            </p>
        </Card>
    )
}

function ContactForm () {
    return (
        <Form id='contact-form'>
            <FormInput label={'Name'} type={'text'} id={'name'} name={'name'} placeholder={'ex.Agent Smith'}/>
            <FormInput label={'Email'} type={'email'} id={'email'} name={'email'}
                       placeholder={'Smith@example.com'}/>
            <FormTextArea label={'Message'} id={'message'} name={'message'} placeholder={'Enter message max 250'}
                          rows={3}/>
            <FormButton/>
        </Form>
    )
}