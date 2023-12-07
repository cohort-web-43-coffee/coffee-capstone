import { App } from './App'
import {PublicAccount} from "./apis/account/account.model";

declare module 'express-session' {
  export interface SessionData {
    account: PublicAccount|undefined
    signature: string|undefined
    jwt: string|undefined
  }
}


// instantiate new app and pass it a port as an argument to start with (4200)
async function main (): Promise<void> {
  try {
    const app = new App(4200)
    await app.listen()
    await app.insertYelpData()
    await app.insertTestAccountData()
    console.log('...yay! Go drink coffee!')
  } catch (e) {
    console.error(e)
  }
}

main().catch(error => { console.error(error) })