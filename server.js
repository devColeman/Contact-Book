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

app.get('/',async (req, res)=>{
    const contactItems = await db.collection('contactBook').find().toArray()
     res.render('index.ejs',{contacts: contactItems } )
})

app.get('/contact-list', async (req, res)=>{
    const contactItems = await db.collection('contactBook').find().toArray()
    res.render('list.ejs',{contacts: contactItems})
})

app.get('/add-contact', (req, res)=>{
    res.render('addContact.ejs')
})


app.put('/unFavorite', (req, res) => {
    console.log(req.body.itemFromJS)
 
    db.collection('contactBook').updateOne({name:  req.body.itemFromJS},{
      $set: {
          favorite: false
        }})
  res.json('Marked Complete')
})

app.put('/favorite', (req, res) => {
 
      db.collection('contactBook').updateOne({name:  req.body.itemFromJS},{
        $set: {
            favorite: true
          }})
    res.json('Marked Complete')
})



app.post('/addNewPerson', (req, res)=>{
    db.collection(`${dbName}`).insertOne({name: req.body.name, phoneNumber: req.body.phoneNumber, email: req.body.email, favorite: false})
    
    .then(result => {
        console.log('Contact Added')
        res.redirect('/')
    })
    .catch(error => console.error(error))


})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})