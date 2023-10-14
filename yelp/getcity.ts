const baseUrl = 'https://api.yelp.com/v3'
const endpoint = '/businesses/search'
require('dotenv').config({path: __dirname + '/.env'})


export async function findAbqCoffeeLocations () {
    return findBusinessByCityAndCategory('albuquerque', 'coffee,coffeeroasteries')
}

async function findBusinessByCityAndCategory (cityName, categories) {
    return fetch(
        getSearchRoute(cityName, categories),
        getData()
    )
        .then((response) => {
                return response.json()
            }, (fetchFailReason) => {
                throw Error(fetchFailReason)
            }
        )
}

function getSearchRoute (cityName, categories) {
    return `${baseUrl}${endpoint}?` + new URLSearchParams({
        location: cityName,
        categories: categories
    })
}

function getData () {
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