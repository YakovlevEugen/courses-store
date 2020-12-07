const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const routes = require('./routes/')
const app = express()

app.engine('pug', require('pug').__express)
app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}))
routes.forEach(route => {app.use(route)})


// Server
const PORT = process.env.PORT || 3000

start()


async function start() {
  try {
    const dbURL = `mongodb+srv://eugen-admin:F0qQ7Fayu3nODgvO@cluster0.tcbz6.mongodb.net/demoExpress`;
  
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  } 
}
