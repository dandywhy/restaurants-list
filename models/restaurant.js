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
  description: preset,
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)