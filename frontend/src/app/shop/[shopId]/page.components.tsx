import React from "react";
import {useParams} from "next/navigation";
import {ImageProps} from "@/app/types/Props";


export async function ShopDetails() {
    const shopId = useParams().shopId as string
    console.log(shopId)
    const data = await getData(shopId)
    console.log(data)
    return (
        <>
            <div className={'flex flex-col gap-2'}>
                {data.map((photoDetails) => {
                    return <ShopDetailImage key={photoDetails.photoId} imageUrl={photoDetails.photoUrl}
                                            imageAlt={`Photograph of ${data.shopName}`}/>
                })}
            </div>
        </>
    )
}

function getRequestData(): RequestInit {
    return {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type":
                'application/json'
        }
    }
}

async function getData(shopId: string):Promise<any> {
    const requestData = getRequestData()
    const url = `${process.env.REST_API_URL}/shop/${shopId}`

    fetch(url, requestData).then((response) => {
        console.log(response)
        return response.json()
    }, (fetchFailReason) => {
        console.error(fetchFailReason)
        throw Error(fetchFailReason)
    })
}


function ShopDetailImage({imageUrl, imageAlt}: ImageProps) {
    return (
        <img src={imageUrl} alt={imageAlt}/>
    )
}