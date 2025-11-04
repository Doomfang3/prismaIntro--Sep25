const prisma = require('../db')

const router = require('express').Router()

// All routes will start with /api/authors
router.get('/', async (req, res, next) => {
  try {
    const allAuthors = await prisma.author.findMany({ include: { books: true } })
    res.json(allAuthors)
  } catch (error) {
    next(error)
  }
})

router.post('/', (req, res, next) => {
  const { firstName, lastName, bio } = req.body

  const newAuthor = {
    firstName,
    lastName,
    bio,
  }

  prisma.author
    .create({ data: newAuthor })
    .then(author => {
      console.log('New author created', author)
      res.status(201).json(author)
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router
