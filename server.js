const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const MongoClient = require('mongodb').MongoClient

const path = require('path');

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.set('view engine', 'ejs')

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'contactBook'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.get('/', (req, res)=>{
     res.render('index.ejs')
})

app.get('/contact-list', (req, res)=>{
    res.render('list.ejs')
})

app.get('/add-contact', (req, res)=>{
    res.render('addContact.ejs')
})

app.post('/addNewPerson', (req, res)=>{
    console.log(req.body);
    res.redirect('/')


})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})