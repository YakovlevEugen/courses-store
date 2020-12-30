const { Router } = require('express')
const Order = require('../models/order')
const authMiddleware = require('../middleware/auth')

const router = Router()


/** GET */
router.get('/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({'user.userId': req.user._id}).populate('user.userId')

    res.render('orders', {
      title: 'Заказы',
      orders: orders.map(order => ({
        ...order._doc,
        totalCost: order.courses.reduce((total, c) => total += c.count * c.course.price, 0)
      }))
    })
  } catch (err) {
    console.log(err);
  }
})

/** POST */
router.post('/orders', authMiddleware, async (req, res) => {
  try {
    const user = await req.user.populate('cart.items.courseId').execPopulate()
    const courses = user.cart.items.map(i => ({
      count: i.count,
      course: {
        ...i.courseId._doc
      }
    }))
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user
      },
      courses
    })
  
    await order.save()
    await req.user.clearCart()
  
    res.redirect('orders')
  } catch(err) {
    console.log(err);
  }
})

module.exports = router