import {Section} from '@/components/Section'
import {SignInForm} from '@/app/(auth)/sign-in/page.client'


export default function SignInPage () {
    return (
        <Section className={'p-4'}>
            <div className={'prose mx-auto'}>
                <header className={'text-primary-container-variant-content text-3xl text-center'}>Sign In</header>
                <SignInForm/>
            </div>
        </Section>
    )
}