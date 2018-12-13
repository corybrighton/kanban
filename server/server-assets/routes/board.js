let router = require('express').Router()
let Boards = require('../models/board')

//GET
router.get('/', (req, res, next) => {
  // @ts-ignore
  Boards.find({ authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

router.get('/:boardId', (req, res, next) => {
  // Boards.findById(req.params.boardId)
  Boards.findOne({ _id: req.params.boardId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST
router.post('/', (req, res, next) => {
  // @ts-ignore
  req.body.authorId = req.session.uid
  Boards.create(req.body)
    .then(newBoard => {
      res.send(newBoard)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT
router.put('/:id', (req, res, next) => {
  Boards.findById(req.params.id)
    .then(board => {
      // @ts-ignore
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      board.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE
// @ts-ignore
router.delete('/:id', (req, res, next) => {
  Boards.findById(req.params.id)
    .then(board => {
      // @ts-ignore
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      board.remove()
      res.send({ message: "Belorted" })
    })
})


module.exports = router