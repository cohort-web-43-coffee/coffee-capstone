const baseUrl = 'https://api.yelp.com/v3'
const searchRoute = '/businesses/search'
const businessDetailsRoute = '/businesses'
// pageSize and maxPages useful for debugging for debugging
// Set to the maximum number or requests allowed for free tier: 49 x 10 + 10 = 500
const pageSize: number = 49
const maxPages: number = 10

export async function findAbqCoffeeBusinesses(): Promise<any> {
    let allBusinesses: any[] = []
    let resultSize: number = 0
    let pageNumber = 0

    do {
        const {businesses} = await findBusinessesByCityAndCategory('albuquerque', 'coffee,coffeeroasteries', pageNumber++)
        allBusinesses = allBusinesses.concat(businesses.filter((businessEntry: any) => !businessEntry.is_closed))
        resultSize = businesses.length
        console.log(`Found ${allBusinesses.length} businesses...`)
    } while (resultSize === pageSize && pageNumber < maxPages)

    return allBusinesses
}

async function findBusinessesByCityAndCategory(cityName: string, categories: string, page: number) {
    const searchRoute = getSearchRoute(cityName, categories, page)
    const result = await makeRequest(searchRoute)
    if(result.error?.code === 'ACCESS_LIMIT_REACHED') throw Error('Sorry friend. You\'ve reached your request limit on Yelp for today.')
    return result
}

export async function readBusinessDetails(businessId: string): Promise<any> {
    const route = getBusinessDetailsRoute(businessId)
    return makeRequest(route)
}

function getSearchRoute(cityName: string, categories: string, page: number): string {
    return `${baseUrl}${searchRoute}?` + new URLSearchParams({
        location: cityName,
        categories,
        limit: pageSize.toString(),
        offset: (pageSize * page).toString(),
        sort_by: 'rating'
    })
}

function getBusinessDetailsRoute(businessId: string): string {
    return `${baseUrl}${businessDetailsRoute}/${businessId}`
}

async function makeRequest (route: string): Promise<any> {
    const requestData = getRequestData()
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    await sleep(100)
    return fetch(route, requestData).then((response) => {
        return response.json()
    }, (fetchFailReason) => {
        console.error(fetchFailReason)
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