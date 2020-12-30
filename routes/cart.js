const { Router } = require('express')
const Course = require('../models/course')
const authMiddleware = require('../middleware/auth')

const router = new Router()

function mapCartItems(cart) {
  return cart.items.map(course => ({
    ...course.courseId._doc,
    count: course.count
  }))
}

function computeTotal(courses) {
  return courses.reduce((total, course) => total += course.price * course.count, 0)
}


/** GET */
router.get('/cart', authMiddleware, async (req, res) => {
  const user = await req.user
    .populate('cart.items.courseId')
    .execPopulate()
  const courses = mapCartItems(user.cart)
  
  res.render('cart', {
    title: 'Корзина',
    totalCost: computeTotal(courses),
    courses
  })
})


/** POST */
router.post('/cart/add', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.body.id)

    await req.user.addToCart(course)
  } catch (err) {
   console.log(err);
  } 

  res.redirect('/cart')
})


/** DELETE */
router.delete('/cart/remove/:id', authMiddleware, async (req, res) => {
  await req.user.removeFromCart(req.params.id)
  const user = await req.user.populate('cart.items.courseId').execPopulate()
  const courses = mapCartItems(user.cart)
  const cart = {
    courses,
    price: computeTotal(courses)
  }

  res.status(200).json(cart)
})

module.exports = router