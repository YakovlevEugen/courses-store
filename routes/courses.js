const { Router } = require('express')
const Course = require('../models/course')

const router = Router()


/** GET */
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().populate('author', 'email name')

    res.render('courses', {
      title: 'Курсы',
      courses
    })
  } catch (err) {
    console.log(err);
  }  
})

router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    
    res.render('courses/course', {
      title: `Курс ${course.title}`,
      course
    })
  } catch (err) {
    console.log(err);
  }
})

router.get('/course/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    res.redirect('/courses')
    return
  }

  try {
    const course = await Course.findById(req.params.id)
  
    res.render('courses/edit', {
      title: `Редактирование курса ${course.title}`,
      course
    })
  } catch (err) {
    console.log(err)
  }
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
    author: req.user,
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

    res.redirect('/courses')
  } catch (err) {
    console.log(err)
  }
})


/** DELETE */
router.delete('/course/remove/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
    res.status(200).end()
  } catch (err) {
    console.log(err)
  }
})

module.exports = router