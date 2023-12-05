import {CloseModalButton} from '@/app/@modal/sign-in/page.client'
import {Modal, ModalActions} from '@/components/Modal'
import {SignUpForm} from '@/app/@modal/sign-up/page.client'

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