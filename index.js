const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('hiya, get route')
})

let port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})