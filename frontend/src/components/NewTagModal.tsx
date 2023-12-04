'use client'

import React from 'react'
import {Modal, ModalActions} from '@/components/Modal'
import {Form, FormInput} from '@/components/Form'

export function NewTagButton() {
    return (
        <>
            <button onClick={() => (document.getElementById('new-tag-modal') as HTMLDialogElement).showModal()}
                    className={'btn btn-primary btn-xs rounded-full'}>New +
            </button>
            <NewTagModal/>
        </>
    )
}

export function NewTagModal () {
    return (
        <Modal id={'new-tag-modal'}>
            <span className={'font-bold text-lg'}>Add a Tag!</span>
            <div className={'py-4 grid grid-cols-1'}>
                <Form id={'new-tag-form'}>
                    <FormInput label={'Tag Name'} id={'tag-label'} name={'tag-label'}
                               placeholder={'One word to describe a cafe'} type={'text'}/>
                </Form>
            </div>
            <ModalActions>
                <button className={'btn btn-primary w-20 font-bold py-2 px-4 rounded mx-3'}>Create</button>
                <button className={'btn btn-primary w-20 font-bold py-2 px-4 rounded'}>Cancel</button>
            </ModalActions>
        </Modal>
    )
}