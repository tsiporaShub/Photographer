import express from 'express'

const app = express()

import bodyParser from 'body-parser';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

import dotenv from 'dotenv'
dotenv.config()

import photographyPackage_router from './routers/photographyPackage.router'
import orderPackage_router from './routers/orderPackage.router'

app.use(photographyPackage_router)
app.use(orderPackage_router)


const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
}).on('error', function (err) {
  console.log("Error occurred, server can't start", err)
})
