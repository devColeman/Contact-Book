const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT

const path = require('path');

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.set('view engine', 'ejs')

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