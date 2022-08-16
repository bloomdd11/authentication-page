const User = require('../model/Auth')
const customAPIError = require('../errors/customAPIErrors')

const register = async (req, res) => {
  const { name } = req.body
  if (name.length < 3) {
    throw new customAPIError('length of name is short try again', 400)
  }
  const user = await User.create(req.body)
  return res.json(user)
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new customAPIError('please provide email and password', 400)
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new customAPIError('Invalid Credentials', 400)
  }

  const isValid = await user.comparePassword(password)
  if (!isValid) {
    throw new customAPIError('Wrong Password Try Again', 400)
  }

  return res.json(user)
  return res.json(req.body)
}

const viewUser = async (req, res) => {
  const user = await User.find({})
  return res.json(user)
}

module.exports = {
  register,
  login,
  viewUser
}