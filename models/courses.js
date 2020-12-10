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
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  logoUrl: String
})

module.exports = model('Courses', courses)