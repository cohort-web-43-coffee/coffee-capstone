import {SignInForm} from '@/app/@modal/sign-in/page.client'
import {Modal, ModalActions} from '@/components/Modal'
import {CloseModalButton} from '@/components/CloseModalButton'


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