import {ChildProps} from '@/types/Props'


export function PrimarySection ({children}: ChildProps) {
    return (
        <section className={'bg-primary-container text-accent'}>
            {children}
        </section>
    )
}

export function SecondarySection ({children}: ChildProps) {
    return (
        <section className={'bg-secondary-container text-secondary-content'}>
            {children}
        </section>
    )
}