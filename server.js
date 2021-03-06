const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./database/connection')
const isAuth = require('./middleware/auth')

//Initializing Express APP
const app = express()

//Initializing Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(isAuth)

//Initializing Morgan to Log Request
app.use(morgan('tiny'))

// Initializing dotenv to secure private details
dotenv.config({path: 'config.env' })
const PORT = process.env.PORT || 8080

//initialize connection to Database
connectDB()

//Register All Routes
app.use('/auth', require('./routes/auth'))
app.use('/wallet', require('./routes/wallet'))

//Error handling Middleware
app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.json({status: status, message: message, data: data})
})


app.listen(PORT, (req, res, next) => {
console.log(`App Wallet Service is running on Port ${PORT}`)
})
