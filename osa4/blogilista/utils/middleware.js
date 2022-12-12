const logger = require('./logger')
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const requestLogger = function(request, response, next) {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = function(request, response) {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  try {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    } 
    next()
  } catch (error) {
    return next(error)
  }
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
  errorHandler,
  userExtractor
}