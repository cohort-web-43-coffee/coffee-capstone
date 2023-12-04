'use client'
import {Modal, ModalActions} from '@/components/Modal'
import {SignInForm} from "@/app/@navbar/components/SignInForm";
import {SignUpForm} from "@/app/@navbar/components/SignUpForm";


export function SignUpModalButton () {
    const handleOnClick = () => (document.getElementById('sign-up-modal') as HTMLDialogElement).showModal()
    return (
        <button onClick={handleOnClick} className={'btn btn-xs btn-primary rounded-full mt-2'}>Sign Up</button>
    )
}

export function SignInModalButton () {
    const handleOnClick = () => (document.getElementById('sign-in-modal') as HTMLDialogElement).showModal()
    return (
        <button onClick={handleOnClick} className={'btn btn-primary btn-xs rounded-full mt-2'}>Sign In</button>
    )
}

export function SignUpModal () {
    return (
        <Modal id={'sign-up-modal'}>
            <h1 className={'font-bold text-lg'}>Sign Up</h1>
            {<SignUpForm/>}

            <ModalActions>
                <button className={'btn'}>Close</button>
            </ModalActions>

        </Modal>
    )
}

export function SignInModal () {
    return (
        <Modal id={'sign-in-modal'}>
            <h1 className={'font-bold text-lg'}>Sign In</h1>
            {<SignInForm/>}
            <ModalActions>
                <button className={'btn'}>Close</button>
            </ModalActions>

        </Modal>
    )
}