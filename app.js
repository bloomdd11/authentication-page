require('dotenv').config()
require('express-async-errors')
const Axios = require('axios')

const express = require('express')
const app = express()

// template engine
app.set('view engine', 'ejs')

// connect db
const connectDB = require('./db/connectDB')

// routers
const AuthRouter = require('./routes/auth-route')
const BlogRouter = require('./routes/blog-route')

// middlewares packages
const errorHandlerMiddleware = require('./middlewares/error-handler')
const authenticationMiddleware = require('./middlewares/authentication')

// middlewares
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.render('index', { header: "Authentication Page", axios: Axios })
})

app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/blog', authenticationMiddleware, BlogRouter)

app.use(errorHandlerMiddleware)

const PORT = 3000 || process.env.PORT
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => console.log(`server is running at port:${PORT} or http://localhost:${PORT}`))
  } catch (error) {
    console.log(error);
  }
}
start()