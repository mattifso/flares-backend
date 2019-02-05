const { Router } = require('express')

const router = Router()
const config = require('../utils/config')
const cacheMiddleware = require('../utils/middleware').cacheMiddleware
const axios = require('axios')

router.get('/year/:year', cacheMiddleware(60), async (req, res) => {
  const startDate = `${req.params.year}-01-01`
  const endDate = `${req.params.year}-12-31`
  const apiUrl = `https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${config.nasaApiKey}`
  try {
    const response = await axios.get(apiUrl)
    res.json(response.data)
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: 'malformatted year' })
  }
})

module.exports = router
