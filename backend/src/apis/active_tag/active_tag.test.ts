import {beforeAll, expect, test} from 'vitest'
import {sql} from '../../utils/database.utils'
import {activeTagRoute} from './active_tag.route'

const baseUrl = 'http://localhost:8080/apis/activeTag'
test('Create active tag', async () => {
    const json = `{
        "active_tag_tag_id": "3424234",
        "active_tag_account_id": "3424234",
        "active_tag_shop_id": "3424234"
    }`

    const response = await postJson('/', json)

    expect(response.status).toBe(200)
})

test('Delete active tag', async () => {
    const json = `{
        "active_tag_account_id": "3a4e101c-c4de-4e2a-900a-505154e2b46e",
        "active_tag_tag_id": "3a4e101c-c4de-4e2a-900a-505154e2b46e",
        "active_tag_shop_id": "3a4e101c-c4de-4e2a-900a-505154e2b46e"
    }`

    const response = await deleteJson('/', json)

    expect(response.status).toBe(200)
})

test('Get active tags by accountId', async () => {
    const accountId = '3a4e101c-c4de-4e2a-900a-505154e2b46e'
    const endpoint = `/activeTagsByAccountId/${accountId}`

    const response = await get(endpoint)

    expect(response.status).toBe(200)
})

test('Get active tags by shopId', async () => {
    const shopId = '3a4e101c-c4de-4e2a-900a-505154e2b46e'
    const endpoint = `/activeTagsByShopId/${shopId}`

    const response = await get(endpoint)

    expect(response.status).toBe(200)
})

test('Get active tag count by tagId', async () => {
    const tagId = '3a4e101c-c4de-4e2a-900a-505154e2b46e'
    const endpoint = `/activeTagCount/${tagId}`

    const response = await get(endpoint)

    expect(response.status).toBe(200)
})

test('Get active tag count by shopId and tagId', async () => {
    const tagId = '3a4e101c-c4de-4e2a-900a-505154e2b46e'
    const shopId = '3a4e101c-c4de-4e2a-900a-505154e2b46e'
    const endpoint = `/activeTagCount/${tagId}/${shopId}`

    const response = await get(endpoint)

    expect(response.status).toBe(200)
})
async function postJson(endpoint: string, json: string) : Promise<Response> {
    const request = buildRequest(endpoint, 'POST', json)
    return fetch(request)
}

async function deleteJson(endpoint: string, json: string) : Promise<Response> {
    const request = buildRequest(endpoint, 'DELETE', json)
    return fetch(request)
}

async function get(endpoint: string) : Promise<Response> {
    const request = buildRequest(endpoint, 'GET', null)
    return fetch(request)
}

function buildRequest(endpoint: string, method: string, body: string) : Request {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return new Request(`${baseUrl}${endpoint}`, {
        method,
        body,
        headers
    })
}