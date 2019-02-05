const cookieParser = require('cookie-parser')
const express = require('express')
const httpErrors = require('http-errors')
const logger = require('morgan')
const path = require('path')

const flaresRouter = require('./routes/flares')

const app = express()
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

app.enable('trust proxy') // for Heroku reverse proxy

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use(limiter)
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'build')))
app.use('/api/flares', flaresRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json(err)
})

module.exports = app
