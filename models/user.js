const mongoose = require('mongoose')
const Schema = mongoose.Schema
const preset = {
  type: String, // 資料型別:字串
  required: true // 必填
}

const userSchema = new Schema({
  name: {
    type: String
  },
  email: preset,
  password: preset,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)