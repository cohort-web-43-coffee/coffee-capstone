import { expect, test } from 'vitest'
import {findLocations} from './getcity'

test('Search for location by city and category', async () => {
    const cityName = 'albuquerque'
    const category = 'coffee,coffeeroasteries'
    const result =  await findLocations(cityName, category)

    expect(result).toBeDefined()
    expect(result).toBeTypeOf('object')
    expect(result.hasOwnProperty('businesses')).toBe(true)
})