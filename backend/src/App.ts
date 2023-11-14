import express, {Application} from 'express'
import morgan from 'morgan'
// Routes
import {indexRoute} from './apis/index.route'
import session from 'express-session'
import {createClient, RedisClientType} from 'redis'
import RedisStore from 'connect-redis'
import {signUpRoute} from "./apis/sign-up/sign-up.route";
import {signInRoute} from "./apis/sign-in/sign-in.route";
import {activeTagRoute} from './apis/active_tag/active_tag.route'
import {bookmarkRoute} from "./apis/bookmark/bookmark.route";
import {tagRoute} from "./apis/tags/tag.route";
import {shopRoute} from "./apis/shop/shop.route";
import {accountRoute} from "./apis/account/account.route";
import {signOutRoute} from "./apis/sign-out/sign-out.route";
import {photoRoute} from "./apis/photo/photo.route";
import helmet from "helmet";
import {
    insertShopAndPhotoDataFromYelp,
    isActiveTagTableEmpty,
    isBookmarkTableEmpty, isPhotoTableEmpty,
    isShopTableEmpty
} from './yelp/adapt'
import {sql} from './utils/database.utils'

// The following class creates the app and instantiates the server
export class App {
    app: Application
    redisClient: RedisClientType
    redisStore: RedisStore

    constructor (
        private readonly port?: number | string
    ) {

        this.redisClient = createClient({socket: {host: process.env.REDIS_HOST}})
        this.redisClient.connect().catch(console.error)

        this.redisStore = new RedisStore({client: this.redisClient})
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
    }

    // private method that sets the port for the sever, to one from index.route.ts, and external .env file or defaults to 3000
    public settings (): void {
        this.app.set('port', this.port)
    }

    // private method to setting up the middleware to handle json responses, one for dev and one for prod
    private middlewares (): void {

        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(session({
            store: this.redisStore,
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET as string,
            resave: false

        }))
        // this.app.use(helmet())
    }

    // private method for setting up routes in their basic sense (ie. any route that performs an action on profiles starts with /profiles)
    private routes (): void {
        this.app.use(indexRoute.basePath, indexRoute.router)
        this.app.use(signUpRoute.basePath, signUpRoute.router)
        this.app.use(signInRoute.basePath, signInRoute.router)
        this.app.use(activeTagRoute.basePath, activeTagRoute.router)
        this.app.use(bookmarkRoute.basePath, bookmarkRoute.router)
        this.app.use(tagRoute.basePath, tagRoute.router)
        this.app.use(shopRoute.basePath, shopRoute.router)
        this.app.use(accountRoute.basePath, accountRoute.router)
        this.app.use(signOutRoute.basePath, signOutRoute.router)
        this.app.use(photoRoute.basePath, photoRoute.router)
    }

    // starts the server and tells the terminal to post a message that the server is running and on what port
    public async listen (): Promise<void> {
        await this.app.listen(this.app.get('port'))
        console.log('Express application built successfully')
    }

    public async insertYelpData () {
        if (process.env.YELP_API_KEY === undefined) {
            console.error('Cannot download Yelp data. Please define YELP_API_KEY in your environment file and restart your container plzkthx.')
        } else if (await isShopTableEmpty() && await isPhotoTableEmpty()) {
            console.log('Fetching data from Yelp...')
            await insertShopAndPhotoDataFromYelp()
            console.log('...yay! Go drink coffee!')
        }
    }

    public async insertTestAccountData () {
        console.log('Checking to see if test data needs to be inserted...')
        if (!await isShopTableEmpty() && await isActiveTagTableEmpty() && await isBookmarkTableEmpty()) {
            console.log('...Tables empty, inserting bookmarks and active tags.')
            await this.insertTestBookmark('The Grove Cafe & Market', 0)
            await this.insertTestBookmark('Little Bear Coffee', 1)
            await this.insertTestBookmark('Barelas Coffee House', 2)
            await this.insertTestBookmark('Novel Point Coffee', 3)
            await this.insertTestBookmark('The Ivy Tearoom', 4)
            await this.insertTestBookmark('Whiting Coffee', 5)
            await this.insertTestBookmark('Nana’s Tea House', 6)
            await this.insertTestBookmark('The Burrow Cafe', 7)
            await this.insertTestBookmark('Odacrem Coffee LLC', 8)
            await this.insertTestBookmark('Krispy Kreme', 9)
            await this.insertTestBookmark('Ethnosphere Coffee', 10)
            await this.insertTestActiveTag('Drip coffee', 'Krispy Kreme')
            await this.insertTestActiveTag('French press', 'Krispy Kreme')
            await this.insertTestActiveTag('Espresso', 'Krispy Kreme')
        } else {
            console.log('Tables not empty, not inserting test data.')
        }
    }

    private async insertTestBookmark (shopName: string, order: number) {
        await sql`INSERT INTO bookmark(bookmark_account_id, bookmark_shop_id, bookmark_order)
                  VALUES ('78110022-3ea1-4d51-9094-ba887e2fb580',
                          (SELECT (shop_id) FROM shop WHERE shop_name = ${shopName} LIMIT 1),
                          ${order})`
    }

    private async insertTestActiveTag (tagLabel: string, shopName: string) {
        await sql`INSERT INTO active_tag(active_tag_account_id, active_tag_shop_id, active_tag_tag_id)
                  VALUES ('78110022-3ea1-4d51-9094-ba887e2fb580',
                          (SELECT (shop_id) FROM shop WHERE shop_name = ${shopName} LIMIT 1),
                          (SELECT (tag_id) FROM tag WHERE tag_label = ${tagLabel} LIMIT 1))`
    }
}