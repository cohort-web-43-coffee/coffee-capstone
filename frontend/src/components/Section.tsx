import {ChildProps, ClassProps} from '@/types/Props'

export function Section ({children, className}: Readonly<ChildProps & ClassProps>) {
    return (
        <section className={'bg-primary-container text-accent drop-shadow-md'}>
            <div className={`container mx-auto bg-primary-container-variant ${className}`}>
                {children}
            </div>
        </section>
    )
}