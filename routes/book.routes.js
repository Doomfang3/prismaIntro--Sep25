const router = require('express').Router()
const prisma = require('../db')

// All routes will start with /api/books

// GET all books
router.get('/', async (req, res, next) => {
  try {
    const allBooks = await prisma.book.findMany({
      include: { author: true },
      omit: { authorId: true },
    })
    res.json(allBooks)
  } catch (error) {
    next(error)
  }
})

// GET one book
router.get('/:bookId', async (req, res, next) => {
  const { bookId } = req.params

  try {
    const oneBook = await prisma.book.findUnique({
      where: { id: bookId },
      include: { author: true },
      omit: { authorId: true },
    })
    res.json(oneBook)
  } catch (error) {
    next(error)
  }
})

// POST one book
router.post('/', async (req, res, next) => {
  const newBookData = req.body

  try {
    const newBook = await prisma.book.create({ data: newBookData })
    res.status(201).json(newBook)
  } catch (error) {
    next(error)
  }
})

// PUT one book
router.put('/:bookId', async (req, res, next) => {
  const { bookId } = req.params
  const updatedBookData = req.body

  try {
    const updatedBook = await prisma.book.update({ where: { id: bookId }, data: updatedBookData })
    res.status(202).json(updatedBook)
  } catch (error) {
    next(error)
  }
})

// DELETE one book
router.delete('/:bookId', async (req, res, next) => {
  const { bookId } = req.params

  try {
    await prisma.book.delete({ where: { id: bookId } })
    res.status(204).json()
  } catch (error) {
    next(error)
  }
})

module.exports = router
