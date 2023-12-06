import {getSession, session} from "@/utils/fetchSession";
import {BookmarkList} from "@/app/account/page.client";


export default async function AccountPage () {
    return await getSession() === undefined ?
        <>Log in</>
        :
        <>
            <header className={'text-3xl text-center text-primary-variant-content pb-4'}>Bookmarks</header>
            <BookmarkList session={session}/>
        </>
}