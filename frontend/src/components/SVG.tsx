import React from 'react'
import {ClassProps} from '@/types/Props'

export function MenuSVG () {
    return (
        <svg xmlns={'http://www.w3.org/2000/svg'} className={'h-5 w-5'} fill={'none'} viewBox={'0 0 24 24'}
             stroke={'currentColor'}>
            <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}
                  d={'M4 6h16M4 12h8m-8 6h16'}/>
        </svg>
    )
}

export function BookmarkAddSVG ({className}: Readonly<ClassProps>) {
    return (
        <svg className={className} xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'>
            <title>Add bookmark</title>
            <path
                d='M200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Zm400 160v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z'/>
        </svg>
    )
}

export function BookmarkAddedSVG ({className}: Readonly<ClassProps>) {
    return (
        <svg className={className} xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'>
            <title>Bookmark added</title>
            <path
                d='M713-600 600-713l56-57 57 57 141-142 57 57-198 198ZM200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Z'/>
        </svg>
    )
}