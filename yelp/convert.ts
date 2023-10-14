export function businessDetailsToShopEntry(businessDetails) : object {
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