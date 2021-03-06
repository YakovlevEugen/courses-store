const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { ADMIN_ID } = require('../constants/users.js')

const router = Router()

router.get('/auth', (req, res) => {
  res.render('auth', {
    loginError: req.flash('loginError'),
    registerError: req.flash('registerError')
  })
})

router.get('/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth#/login')
  })
})

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({email})

    if (!candidate) {
      req.flash('loginError', 'Неверный пароль или email')
      return res.redirect('/auth')
    }

    const areSame = await bcrypt.compare(password, candidate.password)

    if (areSame) {
      req.session.user = candidate
      req.session.isAuthenticated = true
      req.session.save(err => {
        if (err) {
          throw err
        }

        res.redirect('/')
      })
    } else {
       res.redirect('/auth')
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/auth/register', async (req, res) => {
  try {
    const { email, password, confirmPassword, name } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      req.flash('registerError', 'Пользователь с таким email уже существует')
      res.redirect('/auth#/register')
    } else {
      const hashPassword = await bcrypt.hash(password, 10)
      const user = new User({
        email,
        name,
        password: hashPassword,
        cart: {
          items: []
        }
      })

      await user.save()
      res.redirect('/auth#/login')
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router