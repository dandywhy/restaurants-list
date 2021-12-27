// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入 home, todos 模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')
// 引用驗證器
const { authenticator } = require('../middleware/auth')
// 引入路由模組
router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)


// 匯出路由器
module.exports = router