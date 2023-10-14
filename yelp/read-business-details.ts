require('dotenv').config({path: __dirname + '/.env'})
const baseUrl = 'https://api.yelp.com/v3'
const endpoint = '/businesses/'


export async function readBusinessDetails(businessId: string) {
    const route = getBusinessRoute(businessId)
    return fetch(route, getData()).then((response) => {
        return response.json()
    }, (fetchFailReason) => {
        throw Error(fetchFailReason)
    })
}

function getBusinessRoute(businessId: string): string {
    return `${baseUrl}${endpoint}${businessId}`
}

function getData() : RequestInit {
    return {
        credentials: 'include',
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type":
                'application/json',
            Authorization:
                `Bearer ${process.env.YELP_API_KEY}`
        }
    }
}