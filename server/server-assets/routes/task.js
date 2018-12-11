let router = require('express').Router()
let Tasks = require('../models/task')

router.post('/:listId', (req, res, next) => {
  req.body.authorId = req.session.uid
  Tasks.create(req.body)
    .then(task => {
      res.send(task)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})
router.get('/:listId', (req, res, next) => {
  Tasks.find({ authorId: req.session.uid, listId: req.params.listId })
    .then(tasks => {
      res.send(tasks)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})




module.exports = router