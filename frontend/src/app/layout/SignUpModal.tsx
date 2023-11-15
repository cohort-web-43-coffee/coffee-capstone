'use client'
import {Modal, ModalActions} from '@/app/components/Modal'
import {Form, FormInput} from '@/app/components/Form'
import {SignInForm} from "@/app/layout/SignInForm";
import {useState} from "react";
import {SignUpForm} from "@/app/layout/SignUpForm";

export function SignUpModalButton() {
    return (
        <button
            onClick={() => (document.getElementById('sign-up-modal') as HTMLDialogElement).showModal()}
            className={'btn btn-xs btn-primary rounded-full mt-2'}>
                Sign Up
        </button>
    )
}

export function SignInModalButton() {
    return (
        <button
            onClick={() => (document.getElementById('sign-in-modal') as HTMLDialogElement).showModal()}
            className={'btn btn-primary btn-xs rounded-full mt-2'}>
            Sign In
        </button>
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
