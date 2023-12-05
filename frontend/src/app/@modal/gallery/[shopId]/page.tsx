import {getRestData} from '@/utils/fetchHeaders'
import {Modal, ModalActions} from '@/components/Modal'
import {ImageProps} from '@/types/Props'
import React from 'react'
import {CloseModalButton} from '@/components/CloseModalButton'


type GalleryModalProps = {
    params: { shopId: string }
}

export default async function GalleryModal ({params}: Readonly<GalleryModalProps>) {
    const {shopId} = params
    const photoData = await getRestData(`/apis/photo/photoByShopId/${shopId}`)
    const shopData = await getRestData(`/apis/shop/shopId/${shopId}`)

    return (
        <Modal>
            <div className={'grid grid-rows-1 gap-4 justify-center'}>
                {photoData.map((photo: any) => {
                    return <img src={photo.photoUrl} alt={`Customer photo of ${shopData.shopName}`} key={photo.photoId} className={'w-auto h-auto'}/>
                })}
            </div>
            <ModalActions>
                <CloseModalButton/>
            </ModalActions>
        </Modal>)
}