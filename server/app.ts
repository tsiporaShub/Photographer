const express = require('express')

const app = express()

require('dotenv').config()

const PORT = process.env.PORT

app.listen(PORT, (error:any) => {
    if (!error) {
      console.log(`http://localhost:${PORT}`)
    } else { console.log("Error occurred, server can't start", error) }
  })
