const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db_queries')

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json('hiya, get route')
})

app.post('/login', (req, res) => {
    const {email, password} = req.body
    console.log(email, password)
    email && password
        ? db.checkLogin(email, password)
            .then(user_id => {
                user_id
                    ? db.getLists(user_id).then(data => res.json(data))
                    : res.json(null)
            })  
        : res.json(null)
})

let port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})