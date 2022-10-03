# Backend

## Development server

1. Run `npm install` to install all dependecies
2. Run `npm start` to start the development server
3. Server will be hosted in `localhost:3000` 

## Config file

1. Check the file `app.config.json`
```
{
    "MODE": "DEV",
    "PORT": 3000,
    "EXPRESS_ORIGIN_ALLOW": "*"
}
``` 

`MODE` defines which database will be used, if you want to run `tests` with `jest` or `jasmine` please change this field to `TEST`

## Tests

The backend uses [Jest](https://jestjs.io/pt-BR/) as test-plataform. Use `npm test` for start all tests.
