# Project

## Vision
### What the project should accomplish
Helping all coffee drinkers in Albuquerque find the perfect coffee experience.

### Why the project is valuable

We're putting the coffee drinker first. Google Reviews and Yelp tend to require too much digging through rando internet people comments to interpret . Cohort Coffee Project will help coffee users easily find the experience they're looking for.

## Tools
* [Personas](personas) to make user-centric design decisions.
* [Conceptual Model and Entity Relationship Diagram](ERD.md) to design our database.
* [Mockups](mockups.md) to plan the user experience.
* [Insomnia file](insomnia.json) to perform end-to-end REST testing with [Insomnia](https://insomnia.rest).
    * Note: Once you've imported the endpoints into Insomnia, add this to your [environment configuration](https://docs.insomnia.rest/insomnia/environment-variables) (without comments):
      ```json
      {
          "base_url": "http://localhost:8080/apis", // Replace localhost with your container's IP or domain
          "auth_token": "eyJhbGciOiJIU8..." // The authorization token received in response to the sign-in endpoint
      }