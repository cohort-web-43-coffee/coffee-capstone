export async function getRestData(endpoint: string) {
    const url = `${process.env.REST_API_URL}/apis${endpoint}`
    const response = await fetch(url, requestGetHeaders)
    return (await response.json()).data
}

const requestGetHeaders: RequestInit = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        "Content-Type":
            'application/json'
    }
}


