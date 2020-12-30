const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const path = require('path')
const routes = require('./routes/')
const variablesMiddleware = require('./middleware/variables')

const PORT = process.env.PORT || 3000
const MONGODB_URI = `mongodb+srv://eugen-admin:F0qQ7Fayu3nODgvO@cluster0.tcbz6.mongodb.net/demoExpress`;

const app = express()
const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI
})

app.engine('pug', require('pug').__express)
app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: 'someString',
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(variablesMiddleware)
routes.forEach(route => {app.use(route)})

start()


async function start() {
  try {  
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  } 
}
