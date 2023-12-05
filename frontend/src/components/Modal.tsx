import {ChildProps} from '@/types/Props'


export function Modal ({children}: Readonly<ChildProps>) {
    return (
        <dialog className={'modal modal-bottom modal-open sm:modal-middle'}>
            <div className={'modal-box'}>
                {children}
            </div>
        </dialog>
    )
}

export function ModalActions ({children}: Readonly<ChildProps>) {
    return (
        <div className={'modal-action'}>
            <form method={'dialog'}>
                {children}
            </form>
        </div>
    )
}