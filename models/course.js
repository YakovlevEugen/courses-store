const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
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

module.exports = model('Course', courseSchema)