import {findAbqCoffeeLocations} from './yelp-read'
import * as fs from 'fs/promises';


// instantiate new app and pass it a port as an argument to start with (4200)
async function main (): Promise<void> {
    console.log("Starting...")
    const businesses = await findAbqCoffeeLocations()
    const businessesJson = JSON.stringify(businesses)
    const filePath = './data/shop.json'

    console.log(`Saving ${filePath}`)
    await fs.writeFile(filePath, businessesJson)

    console.log("Done!")
}

main().catch(error => { console.error(error) })