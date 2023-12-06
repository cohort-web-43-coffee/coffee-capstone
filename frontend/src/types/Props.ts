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

export type SessionProps = {
    session: Session|undefined
}

export type HrefProps = {
    href: string
}

export type ClassProps = {
    className?: string
}

export type SizeProps = {
    width: number
    height: number
}