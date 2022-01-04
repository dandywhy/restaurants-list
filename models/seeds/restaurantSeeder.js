const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')
const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678',
    list: restaurantList.slice(0, 3)
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    list: restaurantList.slice(3, 6)
  }
]

db.once('open', () => {
  Promise.all(SEED_USER.map(async (seed_user) => {
    const { email, password, list } = seed_user
    await bcrypt
      .genSalt(10)
      .then(salt => { return bcrypt.hash(password, salt) })
      .then(hash => { return User.create({ email, password: hash }) })
      .then(user => {
        const Id = user._id
        return Promise.all(list.map(restaurant => {
          restaurant.userId = Id
          return Restaurant.create(restaurant)
          }))
      })
  }))
  .then(() => {
    console.log('done')
    process.exit()
  })
  .catch(err => console.log(err))
})