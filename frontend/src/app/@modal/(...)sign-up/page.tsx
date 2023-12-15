import {Modal, ModalActions} from '@/components/Modal'
import {CloseModalButton} from '@/components/Modal.client'
import {SignUpForm} from '@/app/(auth)/sign-up/page.client'


export default function SignUpModal () {
    return (
        <Modal>
            <SignUpForm/>
            <ModalActions>
                <CloseModalButton/>
            </ModalActions>
        </Modal>
    )
}