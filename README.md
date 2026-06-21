# Dreamhouse Disco

Interactive jukebox app to demo Heroku basics

*If you are looking for a previous version of Dreamhouse Disco, you might find it over [here](https://github.com/heroku/dreamhouse-disco-old).*

[SCREENSHOT]

## Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Run Dreamhouse Disco locally

```
git clone git@github.com:heroku/dreamhouse-disco.git
yarn
yarn start-dev
```

This will compile the [Create React App](https://github.com/facebook/create-react-app), fire up the server to communicate with [Travolta](https://github.com/heroku/travolta), and compile the sass styles.

Once it starts, visit http://localhost:3000.

> Note: To define a port other than 3000, pass an env var of PORT. For example, `PORT=4567 yarn start-dev`.

### Running Travola locally

[Travolta](https://github.com/heroku/travolta) handles incoming messages for the Dreamhouse Disco Dreamforce demo app.

To connect to a specific instance of [Travolta](https://github.com/heroku/travolta), pass an env var of `TRAVOLTA_URL`.

```
git clone git@github.com:heroku/dreamhouse-disco.git
npm install
npm run build
TRAVOLTA_URL="http://localhost:7000" npm start
```

### Build

To build Dreamhouse Disco, run `yarn build`.

This will build the [Create React App](https://github.com/facebook/create-react-app) and compile the sass files. Once built, you can run `yarn start` to serve the build folder, and visit http://localhost:5000 to see it in action.

test
