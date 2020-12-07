const {Schema, model} = require('mongoose')

const courses = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  logoUrl: String
})

module.exports = model('Courses', courses)