const baseUrl = 'https://api.yelp.com/v3'
const endpoint = '/businesses/search'
require('dotenv').config({path: __dirname + '/.env'})

const MAX_SEARCH_RESULTS = '50'

export async function findAbqCoffeeLocations() {
    return findBusinessByCityAndCategory('albuquerque', 'coffee,coffeeroasteries')
}

async function findBusinessByCityAndCategory(cityName: string, categories: string) {
    const searchRoute = getSearchRoute(cityName, categories)
    return fetch(searchRoute, getData()).then((response) => {
            return response.json()
        }, (fetchFailReason) => {
            throw Error(fetchFailReason)
        }
    )
}

function getSearchRoute(cityName: string, categories: string): string {
    return `${baseUrl}${endpoint}?` + new URLSearchParams({
        location: cityName,
        categories: categories,
        limit: MAX_SEARCH_RESULTS
    })
}

function getData(): RequestInit {
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