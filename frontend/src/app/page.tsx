'use client'

import {ShopListCard} from "@/app/components/Card";
import {PrimarySection} from '@/app/components/Sections'
import {Container} from '@/app/components/Container'

export default function HomePage() {

    return (
        <>
            <PrimarySection>
                <Container autoMargins>
                    <ShopList/>
                </Container>
            </PrimarySection>
        </>
    )
}

function ShopList () {
    return (
        <>
            <div className="card mx-full mt-80 p-5 bg-amber-900 flex-row justify-center">
                <ShopListCard imageUrl={'https://placebear.com/900/900'} alt={'yeet'}/>
                <ShopListCard imageUrl={'https://placebear.com/900/900'} alt={'yeet'}/>
                <ShopListCard imageUrl={'https://placebear.com/900/900'} alt={'yeet'}/>
            </div>
        </>
    )
}