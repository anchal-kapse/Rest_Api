require('dotenv').config()

const express = require('express')

const app = express()

const ProductRouter = require('./03_api/route/01_products')
const OrderRouter = require('./03_api/route/01_orders')

const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const username = process.env.dbuser
const password = process.env.dbpassword

const connectionString = "mongodb+srv://" + username + ":" + password + "@cluster0.oafr1ws.mongodb.net/test"
//const connectionString = process.env.connectionString
mongoose.connect(connectionString)

// app.use((req, res, next) => {
//     res.status(200).json({
//         msg: "This is a simple get request"
//     })
// })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))
app.use(morgan("dev")) //dev is one of the pre-defined format for morgan
app.use('/products', ProductRouter)
app.use('/orders', OrderRouter)

module.exports = app