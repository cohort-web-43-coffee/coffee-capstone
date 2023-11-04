'use client'

import {PrimarySection} from '@/app/components/Section'
import React from 'react'
import {Container} from '@/app/components/Container'
import {busyTags, customTags, drinkTags} from '@/app/mocks/tags'
import {TagList} from '@/app/components/Tag'
import {Modal, ModalActions} from '@/app/components/Modal'
import {Form, FormInput} from '@/app/components/Form'


export default function ShopPage () {
    return <>
        <PrimarySection>
            <Container autoMargins>
                <div className="mx-full p-5 bg-primary-container-variant flex-row justify-center grid grid-cols-[1fr_2fr] gap-3">
                    <div className={'flex flex-col gap-2'}>
                        <img src={'https://placebear.com/400/400'} alt={'yeet'}/>
                        <img src={'https://placebear.com/200/200'} alt={'yeet'}/>
                        <img src={'https://placebear.com/300/300'} alt={'yeet'}/>
                    </div>
                    <div className={'flex flex-col items-center justify-center'}>
                        <div className={'prose'}><h1>Bear Cafe</h1></div>
                        <TagSection/>
                    </div>
                </div>
            </Container>
        </PrimarySection>
    </>
}

function TagSection () {
    return (<>
            <TagList group={customTags} showCounts>
                <button onClick={() => (document.getElementById('new-tag-modal') as HTMLDialogElement).showModal()}
                        className={'btn btn-primary btn-xs rounded-full'}>New +
                </button>
                <NewTagModal/>
            </TagList>
            <TagList group={drinkTags} showCounts/>
            <TagList group={busyTags} showCounts/>
        </>
    )
}

function NewTagModal () {
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