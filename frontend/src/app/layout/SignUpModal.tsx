'use client'
import {Modal, ModalActions} from '@/app/components/Modal'
import {Form, FormInput} from '@/app/components/Form'
import {SignInForm} from "@/app/layout/SignInForm";
import {useState} from "react";

export function SignUpModalButton() {
    return (
        <button
            onClick={() => (document.getElementById('sign-up-modal') as HTMLDialogElement).showModal()}
            className={'btn btn-primary btn-xs rounded-full'}>
            Sign Up
        </button>
    )
}

export function SignIn() {
  const [isShown, setIsShown] = useState(true)

  return (
      <>
          <div>
              {isShown ? <span>{'sign-in-modal'}</span> : <span>{'sign-up-modal'}</span>}
          </div>
          <button onClick={() => {setIsShown(!isShown)}}>I am a button</button>
      </>
  );
}

export function SignInModalButton() {
    return (
        <button
            onClick={() => (document.getElementById('sign-in-modal') as HTMLDialogElement).showModal()}
            className={'btn btn-primary btn-xs rounded-full'}>
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
            <h1 className={'font-bold text-lg'}>Sign I</h1>
            {<SignInForm/>}
            <ModalActions>
                <button className={'btn'}>Close</button>
            </ModalActions>

        </Modal>
    )
}

function SignUpForm () {
    return (
        <Form id={'sign-up-form'}>
            <FormInput label={'Name'} type={'text'} id={'name'} name={'name'} placeholder={'Thomas A. Anderson'}/>
            <FormInput label={'Email'} type={'email'} id={'email'} name={'email'} placeholder={'smith@example.com'}/>
            <FormInput label={'Password'} type={'password'} id={'password'} name={'password'}
                       placeholder={'Enter Password'}/>
            <FormInput label={'Confirm Password'} type={'password'} id={'password'} name={'password'}
                       placeholder={'Confirm Password'}/>
        </Form>
    )
}