const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

const db = require('../../config/mongoose')

db.once('open', () => {
  restaurantList.forEach(item => Restaurant.create(item))
  console.log('done.')
})