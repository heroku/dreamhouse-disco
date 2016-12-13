# Dreamhouse Disco

Interactive jukebox app to demo Heroku basics

*If you are looking for a previous version of Dreamhouse Disco, you might find it over [here](https://github.com/heroku/dreamhouse-disco-old).*

[SCREENSHOT]

## Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Contribute

### Run locally

*Replace the value of `TRAVOLTA_URL` below with your Travolta.*

```
git clone git@github.com:heroku/dreamhouse-disco.git
npm install
npm run build
TRAVOLTA_URL="http://localhost:3000" npm start
```
*NOTE: `npm run start-dev` does not work right now.*
