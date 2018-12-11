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




module.exports = router