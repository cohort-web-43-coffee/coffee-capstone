import {PrimarySection, SecondarySection} from '@/components/Section'
import {Container} from '@/components/Container'
import {CardBody, CardTitle, MediumCard} from '@/components/Card'
import {getSession, session} from "@/utils/fetchSession";
import {BookmarkList} from "@/app/account/page.client";


export default async function AccountPage() {
    const session = await getSession()

    if(session === undefined) {return <>Log in</>}

    return (
        <>
            <PrimarySection>
                <Container autoMargins>
                    <div className={'flex justify-center'}>
                        <AccountCard/>
                    </div>
                </Container>
            </PrimarySection>

            <SecondarySection>
                <Container autoMargins>
                    <BookmarkList session={session}/>
                </Container>
            </SecondarySection>
        </>
    )
}


function AccountCard() {
    return (
        <MediumCard>
            <div className={'place-self-center'}>
                <CardTitle>Account</CardTitle>
            </div>
            <CardBody>
                <div className={'grid grid-cols-2 justify-items-center'}>
                    <h1 className={'text-lg'}>NAME:</h1><p>{session?.account.accountName}</p>

                </div>
            </CardBody>
        </MediumCard>
    )
}