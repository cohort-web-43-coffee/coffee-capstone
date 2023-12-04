import {ChildProps} from '@/types/Props'


export function Container ({children}: Readonly<ChildProps>) {
    return (
        <div className={'container mx-auto py-8'}>
            {children}
        </div>
    )

}

export function PrimaryContainer ({children}: Readonly<ChildProps>) {
    return (
        <div className={'container mx-auto p-4 bg-primary-container-variant'}>
            {children}
        </div>
    )
}