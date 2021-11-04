// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 restaurant model
const Restaurants = require('../../models/restaurant.js')

// 定義首頁路由，顯示所有餐廳
router.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurantsList => res.render('index', { restaurantsList }))
    .catch(error => console.error(error))
})

// 搜尋餐廳
router.get('/search', (req, res) => {
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


// 匯出路由模組
module.exports = router
