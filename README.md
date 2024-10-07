# searchland-test

## Full Stack Tech Lead Test

Welcome to my tech test for Searchland! Thanks for considering me for the position.

This app utilises:

- React
- Express.js
- tRPC
- Drizzle
- Postgress

## How to set up the database?

You're going to need to create a new empty Postgress database the first time you run this project locally.

1. Download and install [PostgreSQL]<https://www.postgresql.org/>
2. Follow the [instructions]<https://www.postgresql.org/docs/current/tutorial-createdb.html> to create a new database

After you have created your database, please duplicate the .env.example file and name the new file ".env". Then modify the URL to include the proper information to connect to your local db:

`postgres://username:password@localhost:5432/dbname`

## How to run?

- `npm i`: Install dependencies in each of the apps.
- `npm run migrate`: Will run the necessary migrations. Make sure to run it when you are setting up the project for the first time!
- `npm run dev`: Will run both the backend and the frontend simultaneously so you can immediately start testing the app.

### Optional

- `npm run dev:frontend` or `npm run dev:backend` run both of the apps separately.
- `npm run test` runs the tests for the whole monorepo, you can customise this by adding `:frontend` or `:backend` at the end to specifically run the ones in the app of your choice.
- `npm run generate-migration` generates a new migration. Run this after making changes to the schema or tables. Make sure to run the migration script after (`npm run migrate`).

### Possible Improvements

- Add authorisations.
- Add management of passwords.
- Make things prettier and more mobile friendly.
- Add more tests! I haven't been able to add frontend tests yet, and the backend tests are very simple.
- Include a docker container to simplify initial setup.

## If everything else fails!

Contact me at [namorcamila@gmail.com]<mailto:namorcamila@gmail.com>.
