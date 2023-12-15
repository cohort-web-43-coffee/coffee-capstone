import {ChildProps} from '@/types/Props'
import {Modal, ModalActions} from '@/components/Modal'
import {CloseModalButton} from '@/components/Modal.client'

export default function AuthModalLayout ({children}: Readonly<ChildProps>) {
    return (
        <Modal>
            {children}
            <ModalActions>
                <CloseModalButton/>
            </ModalActions>
        </Modal>
    )
}