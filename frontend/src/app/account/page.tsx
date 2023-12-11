import {getSession} from "@/utils/fetchSession";
import {BookmarkList} from "@/app/account/page.client";
import {Section} from '@/components/Section'


export default async function AccountPage () {
    const session = await getSession()
    return (
        <Section className={'p-4'}>
            <header className={'text-3xl text-center text-primary-variant-content pb-4'}>Bookmarks</header>
            { session ? <BookmarkList session={session}/> : <p>Please log in to vie bookmarks.</p> }
        </Section>
    )
}