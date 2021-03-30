const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5501

app.get('/', (req, res) => res.send('Hello World! how are you'))



app.listen(port, () => console.log(`Example app listening on port port!`))