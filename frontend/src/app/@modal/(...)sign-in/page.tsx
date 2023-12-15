import {Modal, ModalActions} from '@/components/Modal'
import {CloseModalButton} from '@/components/Modal.client'
import {SignInForm} from '@/app/(auth)/sign-in/page.client'


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