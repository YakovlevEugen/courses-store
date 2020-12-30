const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const path = require('path')
const routes = require('./routes/')
const variablesMiddleware = require('./middleware/variables')

const PORT = process.env.PORT || 3000
const app = express()


app.engine('pug', require('pug').__express)
app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: 'someString',
  resave: false,
  saveUninitialized: false
}))
app.use(variablesMiddleware)
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
  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  } 
}
