const express = require('express')
const Router = express.Router()

const {
  register,
  login,
  viewUser,
  remove
} = require('../controllers/auth')

Router.route('/register').post(register)
Router.route('/login').post(login)
Router.route('/:id').delete(remove)
Router.route('/view').get(viewUser)


module.exports = Router