const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    msg: err.message || 'internal server error',
    statusCode: err.statusCode || 500
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map(item => item.message).join(', ')
    customError.statusCode = 400
  }

  if (err.name === 'JsonWebTokenError') {
    customError.msg = err.message
    customError.statusCode = 401
  }

  //return res.status(customError.statusCode).json({ err })
  return res.status(customError.statusCode).json({ msg: customError.msg })
}
module.exports = errorHandlerMiddleware