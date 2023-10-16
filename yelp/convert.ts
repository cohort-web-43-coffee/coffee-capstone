export function businessDetailsToShopEntry(businessDetails) {
    return {
        "shopName": businessDetails.name,
        "shopAddress": locationToString(businessDetails.location),
        "shopUrl": businessDetails.url,
        "shopPhoneNumber": businessDetails.display_phone
    }
}

function locationToString(location) : string {
    return location.display_address.join('\n')
}
export function businessDetailsToPhotoEntries(businessDetails, businessUuid) {
    return businessDetails.photos.map((element,  index) => {
        return {
            'photo_url': element,
            'photo_order': index,
            'photo_shop_id': businessUuid
        }
    })
}