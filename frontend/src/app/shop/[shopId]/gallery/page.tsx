import {getRestData} from '@/utils/fetchHeaders'
import Image from 'next/image'
import {Section} from '@/components/Section'


export type GalleryPageProps = {
    params: { shopId: string }
}

export default async function GalleryPage ({params: {shopId}}: Readonly<GalleryPageProps>) {
    const photoData = await getRestData(`/apis/photo/shop/${shopId}`)
    const shopData = await getRestData(`/apis/shop/${shopId}`)

    return (
        <Section className={'p-4'}>
            <header className={'text-4xl text-primary-variant-content text-center'}>{shopData.shopName} Photos</header>
            <div className={'grid grid-cols-1 md:grid-cols-3 gap-4 items-center'}>
                {photoData.map((photo: any) => <Image key={photo.photoUrl} src={photo.photoUrl} alt={''} width={0} height={0} sizes={'100vw'} className={'w-full h-auto rounded-lg'}/>)}
            </div>
        </Section>
    )
}