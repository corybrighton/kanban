let router = require('express').Router()
let Lists = require('../models/list')

//GET
router.get('/:boardId', (req, res, next) => {
  // @ts-ignore
  Lists.find({ authorId: req.session.uid, boardId: req.params.boardId })
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
  Lists.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT
// router.put('/:id', (req, res, next) => {
//   Lists.findById(req.params.id)
//     .then(board => {
//       if (!board.authorId.equals(req.session.uid)) {
//         return res.status(401).send("ACCESS DENIED!")
//       }
//       board.update(req.body, (err) => {
//         if (err) {
//           console.log(err)
//           next()
//           return
//         }
//         res.send("Successfully Updated")
//       });
//     })
//     .catch(err => {
//       console.log(err)
//       next()
//     })
// })

//DELETE
router.delete('/:id', (req, res, next) => {
  Lists.findById(req.params.id)
    .then(list => {
      // @ts-ignore
      if (!list.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      list.remove()
      res.send({ message: "Belorted" })
    })
})


module.exports = router