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