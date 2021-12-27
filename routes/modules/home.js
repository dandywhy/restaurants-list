// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurant model
const Restaurants = require('../../models/restaurant')

// 定義首頁路由，顯示所有餐廳
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurants.find({ userId })
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
  const userId = req.user._id
  Restaurants.find(
    { $and: [{ userId }, { $or: [{ name: regexKeyword }, { category: regexKeyword }] }]})
    .lean()
    .then(restaurantsList => res.render('index', { restaurantsList, OriginKeyword }))
    .catch(error => console.log(error))
})

router.get('/search/:sort', (req, res) => {
  const sort = req.params.sort
  const userId = req.user._id
  const selectedSort = {}
  let sortOptions = ''

  switch (sort) {
    case 'asc':
      selectedSort['name'] = 'asc'
      sortOptions = 'A -> Z'
      break
    case 'desc':
      selectedSort['name'] = 'desc'
      sortOptions = 'Z -> A'
      break
    case 'category':
      selectedSort['category'] = 'asc'
      sortOptions = '類別'
      break
    case 'location':
      selectedSort['location'] = 'asc'
      sortOptions = '地區'
      break
    default:
      selectedSort['_id'] = 'asc'
  }
  Restaurants.find({ userId })
    .lean()
    .sort(selectedSort)
    .then(restaurantsList => res.render('index', { restaurantsList, sortOptions }))
    .catch(error => console.log(error))
})



// 匯出路由模組
module.exports = router
