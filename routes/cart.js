const { Router } = require('express')
const Courses = require('../models/courses')

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
router.get('/cart', async (req, res) => {
  const user = await req.user
    .populate('cart.items.courseId')
    .execPopulate()
  const courses = mapCartItems(user.cart)

  console.log(courses)
  
  res.render('cart', {
    title: 'Корзина',
    totalCost: computeTotal(courses),
    courses
  })
})


/** POST */
router.post('/cart/add', async (req, res) => {
  try {
    const course = await Courses.findById(req.body.id)

    await req.user.addToCart(course)
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