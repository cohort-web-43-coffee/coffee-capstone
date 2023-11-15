import {PrimarySection, SecondarySection} from '@/app/components/Section'
import {Container} from '@/app/components/Container'
import {Form, FormButton, FormInput, FormTextArea} from '@/app/components/Form'
import Link from "next/link"
import {MenuButton, MenuContent, SearchField, SiteTitle} from "@/app/layout/NavBar"
import {SignInModal, SignUpModal} from "@/app/layout/SignUpModal"
import {PageProps} from "@/app/types/Props"
import {getRestData} from "@/app/utils/fetch"
import {getSession} from "@/utils/fetchSession";



type AboutUsCardProps = {
    name: string
    linkedIn: string
    gitHub: string
}

export default async function AboutPage({searchParams}: PageProps) {
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
                    <AboutUsHeader/>
                    <section className={'container mx-auto grid grid-cols-2 justify-items-center gap-10 my-12'}>
                        <AboutUsCard name={'Bob'} gitHub={'https://github.com/inhaledesign'}
                                     linkedIn={'https://www.linkedin.com/in/inhale-design/'}/>
                        <AboutUsCard name={'Victor'} gitHub={'https://github.com/vicvilla6'}
                                     linkedIn={'https://www.linkedin.com/in/victor-villa-098330292/'}/>
                        <AboutUsCard name={'Josh'} gitHub={'https://github.com/JoshuaYu2023'}
                                     linkedIn={'https://www.linkedin.com/in/joshua-yu-993887289/'}/>
                        <AboutUsCard name={'Mariposa'} gitHub={' https://github.com/mariposawheat'}
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
                    <p>This website was the group project created by Valid Coffee in Cohort 43 of CNM Ingenuity Deep Dive Fullstack Web development course. Bob, Victor, Mariposa, and Josh, (that's us), created this website so that the coffee drinkers of Albuquerque can have a smooth experience in finding the perfect cup of coffee. We wanted to streamline the long review process that has become the norm, and make it easier to find you want by using tags instead of paragraph reviews. We also put all the coffee shops in one place, making it easier to find instead of having to search through Google Maps and Yelp.<br/>To find out more about the other projects we've made, see the links below! Please use the contact form if you'd like to get in touch with us about any suggestions, comments, concerns, or queries. Thank you for using Valid Coffee! Hope your next cup of coffee is what you're looking for!</p>
                </div>
             </div>
        </div>

    )
}

function AboutUsCard ({name, linkedIn, gitHub}: AboutUsCardProps) {
    return (
        <div>
            <img src={`https://picsum.photos/id/30/300/300`} alt={'picture of developers'} className={'rounded-full w-28 h-28 md:h-52 md:w-52'}/>
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