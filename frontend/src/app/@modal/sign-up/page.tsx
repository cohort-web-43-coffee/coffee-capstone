import {Modal, ModalActions} from '@/components/Modal'
import {SignUpForm} from '@/app/@modal/sign-up/page.client'
import {CloseModalButton} from '@/components/CloseModalButton'

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