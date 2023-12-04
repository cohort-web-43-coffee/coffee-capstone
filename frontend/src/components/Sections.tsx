type SectionProps = {
    children?: any
}

export function PrimarySection(props: SectionProps) {
    return <div className={'bg-primary text-primary-content'}>
        {props.children}
    </div>
}

export function SecondarySection(props: SectionProps) {
    return <div className={'bg-secondary text-secondary-content'}>
        {props.children}
    </div>
}

export function NeutralSection(props: SectionProps) {
    return <div className={'bg-neutral text-neutral-content'}>
        {props.children}
    </div>
}

export function BaseSection(props: SectionProps) {
    return <div className={'bg-base-100 text-base-content'}>
        {props.children}
    </div>
}