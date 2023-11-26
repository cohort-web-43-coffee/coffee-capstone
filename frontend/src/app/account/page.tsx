import {PrimarySection, SecondarySection} from '@/app/components/Section'
import {Container} from '@/app/components/Container'
import {CardBody, CardTitle, MediumCard} from '@/app/components/Card'
import {PageProps} from "@/app/types/Props"
import {getSession, session} from "@/utils/fetchSession";
import {BookmarkList} from "@/app/account/page.client";
import {NavBar} from '@/app/layout/NavBar'


export default async function AccountPage({searchParams}: PageProps) {
    const session = await getSession()
    const query = searchParams.q

    if(session === undefined) {return <>Log in</>}

    return (
        <>
            <NavBar query={query} session={session}/>
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
        <>
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
        </>
    )
}