const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb Error!')
})

db.once('open', () => {
  console.log('Mongodb connected!')
})

module.exports = db
