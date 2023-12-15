import {SignInForm} from '@/app/sign-in/page.client'
import {Modal, ModalActions} from '@/components/Modal'
import {CloseModalButton} from '@/components/Modal.client'


export default function SignInModal () {
    return (
        <Modal>
            <SignInForm/>
            <ModalActions>
                <CloseModalButton/>
            </ModalActions>
        </Modal>
    )
}