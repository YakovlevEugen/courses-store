const { Router } = require('express')
const Order = require('../models.order')

const router = Router()


/** GET */
router.get('/orders', async (req, res) => {
  res.render('orders', {
    title: 'Заказы'
  })
})

/** POST */
router.post('/orders', async (req, res) => {
  res.redirect('orders')
})

module.exports = router