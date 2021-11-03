const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Restaurants = require('./models/restaurant')
const app = express()

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb Error!')
})

db.once('open', () => {
  console.log('Mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurantsList => res.render('index', { restaurantsList }))
    .catch(error => console.error(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))

})

app.get('/search', (req, res) => {
  const OriginKeyword = req.query.keyword
  if (!OriginKeyword) {
    res.redirect("/")
  }
  const keyword = OriginKeyword.trim()
  const regexKeyword = new RegExp(`${keyword}`, 'i')
  console.log(regexKeyword)
  return Restaurants.find({ $or: [{ name: regexKeyword }, { category: regexKeyword }] })
    .lean()
    .then(restaurantsList => res.render('index', { restaurantsList, OriginKeyword }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description

      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}/edit`))
    .catch(error => console.log(error))
})

app.get('/new', (req, res) => res.render('new'))

app.post('/new', (req, res) => {
    Restaurants.create({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: Number(req.body.rating),
    description: req.body.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.post('/delete/:id', (req, res) => {
  const id = req.params.id
  Restaurants.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})