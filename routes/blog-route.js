const express = require('express')
const Router = express.Router()

const { getAllBlog } = require('../controllers/blog')

Router.route('/').get(getAllBlog)

module.exports = Router