import {getRestData} from '@/utils/fetchHeaders'
import {Modal, ModalActions} from '@/components/Modal'
import Image from 'next/image'
import {Carousel, CarouselSlide, getNextSlideIndex, getPreviousSlideIndex} from '@/components/Carousel'
import {CloseModalButton} from '@/components/Modal.client'


type GalleryModalProps = {
    params: { shopId: string }
}

export default async function GalleryModal ({params}: Readonly<GalleryModalProps>) {
    const {shopId} = params
    const photoData = await getRestData(`/apis/photo/photoByShopId/${shopId}`)
    const shopData = await getRestData(`/apis/shop/${shopId}`)

    return (
        <Modal>
            <header className={'top text-base-content text-center text-xl'}>{shopData.shopName} Photos</header>
            <Carousel>
                <PhotoSlides photoData={photoData}/>
            </Carousel>
            <ModalActions>
                <CloseModalButton/>
            </ModalActions>
        </Modal>)
}

function PhotoSlides({photoData}: {photoData: any[]}) {
    return photoData.map((photo: any, index: number, photos: any[]) => {
        const max = photos.length
        const previousIndex = getPreviousSlideIndex(index, max)
        const nextIndex = getNextSlideIndex(index, max)
        return (
            <CarouselSlide
                className={'min-h-[30vh]'}
                key={photo.photoId}
                slideId={photo.photoId}
                nextSlideId={photos[nextIndex].photoId}
                previousSlideId={photos[previousIndex].photoId}>
                <Image
                    src={photo.photoUrl}
                    alt={''}
                    key={photo.photoId}
                    fill
                    className={'object-cover w-full rounded-lg'}/>
            </CarouselSlide>
        )
    })
}