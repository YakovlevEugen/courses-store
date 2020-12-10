const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const routes = require('./routes/')
const User = require('./models/user')

const PORT = process.env.PORT || 3000
const app = express()


app.engine('pug', require('pug').__express)
app.set('views', './views')
app.set('view engine', 'pug')

app.use(async (req, res, next) => {
  try {
    const adminUserId = '5fd0c9a4df41834cc1b83a34'
    const user = await User.findById(adminUserId)

    req.user = user
    next()
  } catch (err) {
    console.log(err)
  }
})
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}))
routes.forEach(route => {app.use(route)})

start()


async function start() {
  try {
    const dbURL = `mongodb+srv://eugen-admin:F0qQ7Fayu3nODgvO@cluster0.tcbz6.mongodb.net/demoExpress`;
  
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    const candidate = await User.findOne()

    if (!candidate) {
      const user = new User({
        email: 'yae@test.ru',
        name: 'Eugen',
        cart: {
          items: []
        }
      })
      await user.save()
    }
  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  } 
}
