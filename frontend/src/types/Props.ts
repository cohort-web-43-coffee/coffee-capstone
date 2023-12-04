import {Session} from "@/utils/fetchSession";

export type ChildProps = {
    children: React.ReactNode
}

export type IdProps = {
    id: string
}

export type ImageProps = {
    imageUrl: string,
    imageAlt: string
}

export type SearchProps = {
    searchParams: {
        q: string,
        tags: string
    }
}

export type SessionProps = {
    session: Session|undefined
}