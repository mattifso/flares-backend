if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let port = process.env.PORT
let nasaApiKey = process.env.NASA_API_KEY

module.exports = {
  port,
  nasaApiKey
}