const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Главная'
  })
})

router.get('/auth', (req, res) => {
  res.render('auth')
})

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'О нас'
  })
})

module.exports = router