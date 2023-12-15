import {Section} from '@/components/Section'
import {SignUpForm} from '@/app/(auth)/sign-up/page.client'

export default function SignUpPage () {
    return (
        <Section className={'p-4'}>
            <div className={'prose mx-auto'}>
                <header className={'text-primary-container-variant-content text-3xl text-center'}>Sign Up</header>
                <SignUpForm/>
            </div>
        </Section>
    )
}