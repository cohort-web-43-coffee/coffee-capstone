import {ChildProps} from '@/types/Props'


export function Container ({children}: Readonly<ChildProps>) {
    return (
        <div className={'container mx-auto'}>
            {children}
        </div>
    )

}

export function PrimaryContainer ({children}: Readonly<ChildProps>) {
    return (
        <div className={'container mx-auto bg-primary-container-variant'}>
            {children}
        </div>
    )
}