const { Router } = require('express')

const router = Router()

router.get('/auth', (req, res) => {
  res.render('auth')
})

router.get('/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth#/login')
  })
})

router.post('/auth/login', async (req, res) => {
  req.session.isAuthenticated = true
  res.redirect('/')
})

router.post('/auth/register', async (req, res) => {

})

module.exports = router