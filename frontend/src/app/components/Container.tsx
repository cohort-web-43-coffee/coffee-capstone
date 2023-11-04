import {ChildProps} from '@/app/types/Props'

type ContainerProps = ChildProps & {
    autoMargins?: boolean
}

export function Container ({children, autoMargins}: ContainerProps) {
    if (autoMargins) {
        return (
            <div className={'container mx-auto py-8'}>
                {children}
            </div>
        )
    } else {
        return (
            <div className={'py-8'}>
                {children}
            </div>
        )
    }
}

export function PrimaryContainer ({children, autoMargins}: ContainerProps) {
    if (autoMargins) {
        return (
            <div className={'container mx-auto p-4 bg-primary-container-variant'}>
                {children}
            </div>
        )
    } else {
        return (
            <div className={'p-8 bg-primary-container-variant'}>
                {children}
            </div>
        )
    }
}