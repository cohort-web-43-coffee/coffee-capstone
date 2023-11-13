export type ChildProps = {
    children: React.ReactNode
}

export type OptionalChildProps = {
    children?: React.ReactNode
}

export type IdProps = {
    id: string
}

export type ImageProps = {
    imageUrl: string,
    imageAlt: string
}

export type PageProps = {
    searchParams: {
        q: string,
        tags: string
    }
}