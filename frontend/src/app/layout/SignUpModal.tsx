'use client'
import {Modal, ModalActions} from '@/app/components/Modal'
import {Form, FormInput} from '@/app/components/Form'

export function SignUpModalButton() {
    return (
        <button
            onClick={() => (document.getElementById('sign-up-modal') as HTMLDialogElement).showModal()}
            className={'btn btn-primary btn-xs rounded-full'}>
            Sign up
        </button>
    )
}

export function SignUpModal () {
    return (
        <Modal id={'sign-up-modal'}>
            <h1 className={'font-bold text-lg'}>Sign Up</h1>
            <SignUpForm/>
            <ModalActions>
                <button className={'btn'}>Close</button>
            </ModalActions>
        </Modal>
    )
}

function SignUpForm () {
    return (
        <Form id={'sign-up-form'}>
            <FormInput label={'Name'} type={'text'} id={'name'} name={'name'} placeholder={'ex.Agent Smith'}/>
            <FormInput label={'Email'} type={'email'} id={'email'} name={'email'} placeholder={'Smith@example.com'}/>
            <FormInput label={'Password'} type={'password'} id={'password'} name={'password'}
                       placeholder={'Enter Password'}/>
            <FormInput label={'Confirm Password'} type={'password'} id={'password'} name={'password'}
                       placeholder={'Confirm Password'}/>
        </Form>
    )
}