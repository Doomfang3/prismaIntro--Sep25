const router = require('express').Router()

// All routes will start with /api
router.get('/', (req, res) => {
  res.json('All good in here')
})

const bookRoutes = require('./book.routes')
router.use('/books', bookRoutes)

const authorRoutes = require('./author.routes')
router.use('/authors', authorRoutes)

module.exports = router
