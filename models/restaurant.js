const mongoose = require('mongoose')
const Schema = mongoose.Schema

const preset = {
  type: String,
  require: true
}

const restaurantSchema = new Schema({
  name: preset ,
  name_en: preset ,
  category: preset ,
  image: preset ,
  location: preset ,
  phone: preset,
  google_map: preset ,
  rating: {
    type: Number,
    require: true
  },
  description: preset 
})

module.exports = mongoose.model('Restaurant', restaurantSchema)