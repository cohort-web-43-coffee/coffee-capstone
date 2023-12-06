import {getRestData} from '@/utils/fetchHeaders'
import {Modal, ModalActions} from '@/components/Modal'
import React from 'react'
import {CloseModalButton} from '@/components/CloseModalButton'
import Image from 'next/image'


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
                <p>${shopData.shopName} Photos</p>
                {photoData.map((photo: any) => {
                    return <Image src={photo.photoUrl} alt={''} key={photo.photoId} className={'w-auto h-auto'}/>
                })}
            </div>
            <ModalActions>
                <CloseModalButton/>
            </ModalActions>
        </Modal>)
}