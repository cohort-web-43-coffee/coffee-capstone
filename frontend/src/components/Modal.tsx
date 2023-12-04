import {ChildProps, IdProps} from '@/types/Props'


export function Modal ({children, id}: ChildProps & IdProps) {
    return (
        <dialog id={id} className={'modal modal-bottom sm:modal-middle'}>
            <div className={'modal-box'}>
                {children}
            </div>
        </dialog>
    )
}

export function ModalActions ({children}: ChildProps) {
    return (
        <div className={'modal-action'}>
            <form method={'dialog'}>
                {children}
            </form>
        </div>
    )
}