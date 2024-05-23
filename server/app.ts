import express from 'express'

const app = express()

import dotenv from 'dotenv'
dotenv.config()

import photographyPackage_Controller from './controllers/photographyPackage.controller'
app.use(photographyPackage_Controller)


const PORT = process.env.PORT

app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`)
  }).on('error', function(err) {
    console.log("Error occurred, server can't start", err) 
  })
