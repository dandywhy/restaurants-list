module.exports = {
  authenticator: (req, res, next) => {
    // 檢測是否已驗證
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用!')
    res.redirect('/users/login')
  }
}