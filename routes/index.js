const authRoutes = require('./auth')
const cartRoutes = require('./cart')
const commonRoutes = require('./common')
const ordersRoutes = require('./orders')
const coursesRoutes = require('./courses')


module.exports = [
  authRoutes,
  cartRoutes,
  commonRoutes,
  ordersRoutes,
  coursesRoutes
]