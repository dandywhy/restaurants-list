const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results


mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  restaurantList.forEach(item => Restaurant.create(item))
  console.log('done.')
})