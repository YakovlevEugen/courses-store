const { Router } = require('express')
const Course = require('../models/courses')

const router = Router()


/** GET */
router.get('/courses', async (req, res) => {
  const courses = await Course.find()

  res.render('courses', {
    title: 'Курсы',
    courses
  })
})

router.get('/courses/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)

  res.render('courses/course', {
    title: `Курс ${course.title}`,
    course
  })
})

router.get('/course/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    res.redirect('/courses')
    return
  }

  const course = await Course.findById(req.params.id)

  res.render('courses/edit', {
    title: `Редактирование курса ${course.title}`,
    course
  })
})

router.get('/course/add', (req, res) => {
  res.render('courses/add', {
    title: 'Новый курс'
  })
})


/** POST */
router.post('/course/add', async (req, res) => {
  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    logoUrl: req.body.logoUrl
  })
  
  try {
    await course.save()
    res.redirect('/courses')
  } catch (err) {
    console.log(err)
  }
})

router.post('/course/edit', async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.body.id, req.body)
  } catch (err) {
    console.log(err)
  }

  res.redirect('/courses')
})

module.exports = router