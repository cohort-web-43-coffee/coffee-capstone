# Valid Coffee

Valid Coffee is a web application designed to stream line user reviews experiences. It uses Yelp business data for coffee shops in Albuquerque, while providing a unique interface for leaving reviews.

It's a Docker-based full stack web application utilizing Postgresql, Express, Next, and React.

## Spin Up

1. Create `project.env` in the root directory:
    ```dotenv
    POSTGRES_DB=coffee
    POSTGRES_USER=username
    POSTGRES_HOST=sql
    # generate a unique diceware password: https://secure.research.vt.edu/diceware/#eff
    POSTGRES_PASSWORD=
    REDIS_HOST=redis
    REDIS_PORT=6379
    SESSION_SECRET=WHATeverIwant
    # mailgun credentials from: https://www.mailgun.com
    MAILGUN_DOMAIN=
    MAILGUN_API_KEY=
    # get a Yelp Fusion API key: https://fusion.yelp.com
    YELP_API_KEY=
    ```
2. Create `.env.development` in `/frontend`:
    ```dotenv
    REST_API_URL=http://localhost:8080 # domain of your development container
    PUBLIC_API_URL=http://localhost:3000 # always localhost
    ```

* Run `docker compose up` in the root directory. Every time the containers spin up, the front end app will  check the database tables. If any are empty, it will download the relevant data from Yelp and insert some data for a test account.

> [!WARNING]
> The free tier of Yelp Fusion limits you to 500 requests per day. This is enough to download data for all coffeeshops in Albuquerque once. If you try more than once, you'll end up with incomplete data and get locked out. If this happens, wait 24hrs and do `docker compose down -v` to reset the database.  

## Contributing
* Once you've got the container spun up, visit our [documentation](docs) to get started!
* If you have something you would like to contribute, please file an issue to discuss it!