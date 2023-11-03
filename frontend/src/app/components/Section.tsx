import {ChildProps} from '@/app/types/Props'


export function PrimarySection ({children}: ChildProps) {
    return (
        <section className={'bg-primary text-primary-content'}>
            {children}
        </section>
    )
}

export function SecondarySection ({children}: ChildProps) {
    return (
        <section className={'bg-secondary text-secondary-content'}>
            {children}
        </section>
    )
}

export function NeutralSection ({children}: ChildProps) {
    return (
        <section className={'bg-neutral text-neutral-content'}>
            {children}
        </section>
    )
}