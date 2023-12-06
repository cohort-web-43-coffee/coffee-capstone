import {PrimarySection} from '@/components/Section'
import {PrimaryContainer} from '@/components/Container'
import {getSession, session} from "@/utils/fetchSession";
import {BookmarkList} from "@/app/account/page.client";


export default async function AccountPage () {
    const session = await getSession()

    if (session === undefined) {
        return <>Log in</>
    }

    return (
        <PrimarySection>
            <PrimaryContainer>
                <header className={'text-3xl text-center text-primary-variant-content pb-4'}>Bookmarks</header>
                <BookmarkList session={session}/>
            </PrimaryContainer>
        </PrimarySection>
    )
}