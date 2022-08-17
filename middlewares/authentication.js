require('dotenv').config()

const jwt = require('jsonwebtoken')
const customAPIError = require('../errors/customAPIErrors')

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new customAPIError('Authentication Invalid', 401)
  }

  let token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    payload ? console.log(payload) : console.log('invalid')
    req.user = { userId: payload.userId, userName: payload.userName }
  } catch (error) {
    throw new customAPIError('Authentication Invalid', 401)
  }
  next()
}

module.exports = auth
