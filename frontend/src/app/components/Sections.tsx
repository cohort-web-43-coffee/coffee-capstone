import {ChildProps} from '@/app/types/Props'


export function PrimarySection ({children}: ChildProps) {
    return (
        <div className={'bg-primary text-primary-content'}>
            {children}
        </div>
    )
}

export function SecondarySection ({children}: ChildProps) {
    return (
        <div className={'bg-secondary text-secondary-content'}>
            {children}
        </div>
    )
}

export function NeutralSection ({children}: ChildProps) {
    return (
        <div className={'bg-neutral text-neutral-content'}>
            {children}
        </div>
    )
}