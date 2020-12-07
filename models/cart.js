const fs = require('fs')
const path = require('path')

const pathCartFile = path.join(
  path.dirname(require.main.filename),
  'db',
  'cart.json'
)

class Cart {
  static async add(course) {
    const cart = await Cart.get()

    const idx = cart.courses.findIndex(c => c.id === course.id)
    const candidate = cart.courses[idx]

    if (candidate) {
      candidate.count++
      cart.courses[idx] = candidate
    } else {
      course.count = 1
      cart.courses.push(course)
    }

    cart.totalCost += +course.price

    return new Promise((resolve, reject) => {
      fs.writeFile(pathCartFile, JSON.stringify(cart), err => {
        if (err) {
          reject(err)
        }

        resolve()
      })
    })
  }

  static async get() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathCartFile, 'utf-8', (err, content) => {
        if (err) {
          reject(err)
        }

        resolve(JSON.parse(content))
      })
    })
  }

  static async remove(id) {
    const cart = await Cart.get()

    const idx = cart.courses.findIndex(c => c.id === id)
    const course = cart.courses[idx]

    if (course.count === 1) {
      cart.courses = cart.courses.filter(c => c.id !== id)
    } else {
      cart.courses[idx].count--
    }

    cart.totalCost -= +course.price

    return new Promise((resolve, reject) => {
      fs.writeFile(pathCartFile, JSON.stringify(cart), err => {
        if (err) {
          reject(err)
        }

        resolve(cart)
      })
    })
  }
}

module.exports = Cart