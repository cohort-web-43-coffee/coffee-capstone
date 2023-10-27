const baseUrl = 'https://api.yelp.com/v3'
const searchRoute = '/businesses/search'
const businessDetailsRoute = '/businesses'
const maxSearchResults = '50'

export async function findAbqCoffeeBusinesses(): Promise<any> {
    return findBusinessByCityAndCategory('albuquerque', 'coffee,coffeeroasteries')
}

async function findBusinessByCityAndCategory(cityName: string, categories: string) {
    const searchRoute = getSearchRoute(cityName, categories)
    return makeRequest(searchRoute)
}

export async function readBusinessDetails(businessId: string): Promise<any> {
    const route = getBusinessDetailsRoute(businessId)
    return makeRequest(route)
}

function getSearchRoute(cityName: string, categories: string): string {
    return `${baseUrl}${searchRoute}?` + new URLSearchParams({
        location: cityName,
        categories: categories,
        limit: maxSearchResults
    })
}

function getBusinessDetailsRoute(businessId: string): string {
    return `${baseUrl}${businessDetailsRoute}/${businessId}`
}

function makeRequest(route: string): Promise<any> {
    const requestData = getRequestData()
    return fetch(route, requestData).then((response) => {
        return response.json()
    }, (fetchFailReason) => {
        throw Error(fetchFailReason)
    })
}

function getRequestData(): RequestInit {
    return {
        credentials: 'include',
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type":
                'application/json',
            Authorization:
                `Bearer ${process.env.YELP_API_KEY as string}`
        }
    }
}