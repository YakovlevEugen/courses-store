const { Router } = require('express')
const Cart = require('../models/cart')
const Course = require('../models/courses')

const router = new Router()


/** GET */
router.get('/cart', async (req, res) => {
  const cart = await Cart.get()
  
  res.render('cart', {
    title: 'Корзина',
    courses: cart.courses,
    totalCost: cart.totalCost
  })
})


/** POST */
router.post('/cart/add', async (req, res) => {
  const course = await Course.getById(req.body.id)

  try {
    await Cart.add(course)
  } catch (err) {
   console.log(err);
  } 

  res.redirect('/cart')
})


/** DELETE */
router.delete('/cart/remove/:id', async (req, res) => {
  const cart = await Cart.remove(req.params.id)

  res.status(200).json(cart)
})

module.exports = router