const { Router } = require('express')
const User = require('../models/user')
const { ADMIN_ID } = require('../constants/users.js')

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
  const user = await User.findById(ADMIN_ID)

  req.session.user = user
  req.session.isAuthenticated = true
  req.session.save(err => {
    if (err) {
      throw err
    }

    res.redirect('/')
  })
})

router.post('/auth/register', async (req, res) => {

})

module.exports = router