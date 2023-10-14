import { expect, test } from 'vitest'
import {findAbqCoffeeLocations} from './getcity'

test('List Albuquerque coffee shops', async () => {
    const result =  await findAbqCoffeeLocations()

    expect(result).toBeDefined()
    expect(result).toBeTypeOf('object')
    expect(result).toHaveProperty('businesses')
    expect(result.businesses.every((element) => element.location.city.toLowerCase() === 'albuquerque')).true
    expect(result.businesses.every((element) => element.location.state.toLowerCase() === 'nm')).true
})