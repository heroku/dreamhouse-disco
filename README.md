# Dreamhouse Disco

Interactive jukebox app to demo Heroku basics

*If you are looking for a previous version of Dreamhouse Disco, you might find it over [here](https://github.com/heroku/dreamhouse-disco-old).*

[SCREENSHOT]

## Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Contribute

### Run locally

*Please note SASS is not automatically compiled.

```
git clone git@github.com:heroku/dreamhouse-disco.git
npm install
npm run start-dev
```

Run production:

*Replace the value of `TRAVOLTA_URL` below with your Travolta.*

```
git clone git@github.com:heroku/dreamhouse-disco.git
npm install
npm run build
TRAVOLTA_URL="http://localhost:3000" npm start
```

### Sass

To build the `.scss` files:

```
npm run sass
```

To watch `.scss` files:

```
npm run sass-dev
```