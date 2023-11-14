export function businessDetailsToShopEntry(businessDetails: any): any {
    try {
        return {
            "shopName": businessDetails.name,
            "shopAddress": locationToString(businessDetails.location),
            "shopUrl": businessDetails.url,
            "shopPhoneNumber": businessDetails.display_phone,
            "shopPhotoUrl": businessDetails.image_url
        }
    } catch (error: any) {
        console.error(`Error converting entry:\n${JSON.stringify(businessDetails)}`)
        throw error
    }
}

function locationToString(location: any) : string {
    return location.display_address.join('\n')
}

export function businessDetailsToPhotoEntries(businessDetails: any) {
    return businessDetails.photos.map((element: any,  index: number) => {
        return {
            'photoUrl': element,
            'photoOrder': index,
            'photoCredit': '',
            'photoDescription': ''
        }
    })
}