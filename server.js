const path = require('path')
const express = require('express')

const app = express()

const port = process.env.PORT || 3000

// Redirect all HTTP traffic to HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    app.enable('trust proxy', 'loopback')
    if (req.secure) {
      return next()
    }
    res.redirect(`https://${req.hostname}${req.url}`)
  })
}

app.use('/', express.static(path.resolve(__dirname, 'build')))

app.get('/config', (req, res) => {
  res.json(
    {
      apiUrl: process.env.TRAVOLTA_URL || `https://travolta-production.herokuapp.com`,
    }
  )
})

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(port)
console.log(`Serving static files on port ${port}`)
