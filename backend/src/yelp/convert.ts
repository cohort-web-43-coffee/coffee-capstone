export function businessDetailsToShopEntry(businessDetails: any): any {
    return {
        "shopName": businessDetails.name,
        "shopAddress": locationToString(businessDetails.location),
        "shopUrl": businessDetails.url,
        "shopPhoneNumber": businessDetails.display_phone
    }
}

function locationToString(location: any) : string {
    return location.display_address.join('\n')
}

export function businessDetailsToPhotoEntries(businessDetails: any, businessUuid: any) {
    return businessDetails.photos.map((element: any,  index: number) => {
        return {
            'photo_url': element,
            'photo_order': index,
            'photo_shop_id': businessUuid
        }
    })
}