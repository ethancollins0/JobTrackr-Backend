const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db_queries')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()
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
                    ? db.getLists(user_id).then(data => {
                        res.json({ token: jwt.sign({ user_id }, process.env.SECRET) , data })
                    })
                    : res.json(null)
            })  
        : res.json(null)
})

app.post('/checktoken', (req, res, next) => {
    if (req.headers.authorization){
        jwt.verify(req.headers.authorization, process.env.SECRET, (err, decoded) => {
            if (err){
                res.json(null)
            } else {
                db.checkExists(decoded.user_id)
                    .then(result => {
                        if (result && result.id){
                            db.getLists(decoded.user_id).then(data => {
                                data
                                    ? res.json({ user_id: decoded.user_id, data})
                                    : res.json(null)
                        })
                    } else {
                        res.json(null)
                    }
                })
            }
        })
    } else {
        res.json(null)
    }
})

app.post('lists', (req, res) => {
    if (req.headers.authorization){
        jwt.verify(req.headers.authorization, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.json(null);
            } else {
                db.createList(decoded.user_id, req.body.list)
                    .then(result => res.json(result))
            }

        })
    } else {
        res.json(null)
    }
})

app.post('/list-item', (req, res) => {
    if (req.headers.authorization && req.body && req.body.list_id){
        jwt.verify(req.headers.authorization, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.json(null)
            } else {
                db.createListItem(req.body)
                    .then(list_item => {
                        list_item
                            ? res.json({ list_item })
                            : res.json(null)
                    })
                    .catch(() => res.json(null))
            }
        })
    }
})


let port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})