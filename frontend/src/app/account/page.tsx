import {getSession, session} from "@/utils/fetchSession";
import {BookmarkList} from "@/app/account/page.client";
import {Section} from '@/components/Section'


export default async function AccountPage () {
    return await getSession() === undefined ?
        <>Log in</>
        :
        <Section className={'p-4'}>
            <header className={'text-3xl text-center text-primary-variant-content pb-4'}>Bookmarks</header>
            <BookmarkList session={session}/>
        </Section>
}