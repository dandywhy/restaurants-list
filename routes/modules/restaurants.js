const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()
const Restaurants = require('../../models/restaurant')



// 打開新增餐廳頁面
router.get('/new', (req, res) => res.render('new'))
// 顯示餐廳頁面
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurants.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})
// 顯示編輯頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Restaurants.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})
// 修改編輯頁面
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Restaurants.findOne({ _id, userId })
    .then(restaurant => {
      Object.assign(restaurant, req.body)
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}/edit`))
    .catch(error => console.log(error))
})
// 新增餐廳
router.post('/new', (req, res) => {
  const userId = req.user._id

  req.body.userId = userId
  Restaurants.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})
// 刪除餐廳
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurants.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 匯出路由模組
module.exports = router