const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant.js')



// 打開新增餐廳頁面
router.get('/new', (req, res) => res.render('new'))

// 顯示餐廳頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))

})

// 顯示編輯頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

// 修改編輯頁面
router.put('/:id', (req, res) => {
  const id = req.params.id
  Restaurants.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}/edit`))
    .catch(error => console.log(error))
})

// 新增餐廳
router.post('/new', (req, res) => {
  Restaurants.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// 刪除餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurants.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router