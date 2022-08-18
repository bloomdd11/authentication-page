const User = require('../model/Auth')
const customAPIError = require('../errors/customAPIErrors')

const register = async (req, res) => {
  const { name } = req.body

  if (name.length < 3) {
    throw new customAPIError('length of name is short try again', 400)
  }

  const user = await User.create(req.body)

  const token = user.createJWT()

  return res.json({ username: name, token: token })
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

  const token = user.createJWT()

  //return res.json(user)
  return res.json({ username: user.name, token: token })

}

const viewUser = async (req, res) => {
  const user = await User.find({})
  return res.json(user)
}

const remove = async (req, res) => {
  let { id: userId } = req.params

  const user = await User.findByIdAndDelete({ _id: userId })

  if (!user) {
    throw new customAPIError(`no user with id : ${userId}`, 400)
  }

  return res.json({ msg: "done" })
}

module.exports = {
  register,
  login,
  viewUser,
  remove
}