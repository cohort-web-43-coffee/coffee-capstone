import {PrimarySection, SecondarySection} from '@/app/components/Sections'
import React from 'react'
import {Container} from '@/app/components/Container'

type Tag = { label: string, count: number }
type TagGroup = { group: string, tags: Tag[] }
type TagProps = { tag: Tag }
type TagGroupProps = { group: TagGroup }

const drinkTags =
    {
        group: 'Drinks',
        tags: [
            {
                label: 'Espresso',
                count: 9
            },
            {
                label: 'Drip',
                count: 5
            },
            {
                label: 'Pour-Over',
                count: 8
            },
            {
                label: 'Turkish',
                count: 2
            }
        ]
    }
const busyTags =
    {
        group: 'Busy',
        tags: [
            {
                label: 'Sunrise',
                count: 2
            },
            {
                label: 'Morning',
                count: 4
            },
            {
                label: 'Lunch',
                count: 12
            },
            {
                label: 'Afternoon',
                count: 8
            },
            {
                label: 'Evening',
                count: 2
            },
            {
                label: 'Late',
                count: 0
            }
        ]
    }

export default function ShopPage () {
    return <>
        <ImagesSection/>
    </>
}

function ImagesSection () {
    return <SecondarySection>
        <Container autoMargins>
            <TagList group={drinkTags}/>
            <TagList group={busyTags}/>
        </Container>
    </SecondarySection>
}

function TagList (props: TagGroupProps) {
    const {group} = props
    return <>
        <div className={'divider'}>{group.group}</div>
        <div className={'flex gap-6'}>
            {group.tags
                .sort((a: Tag, b: Tag) => b.count - a.count)
                .map((tag: Tag) => <TagButton tag={tag}/>)}
        </div>
    </>
}

function TagButton (props: TagProps) {
    const {label, count} = props.tag
    return <button className={'btn btn-primary btn-xs md:btn-sm lg:btn-md'}>#{label} <em>{count}</em></button>
}