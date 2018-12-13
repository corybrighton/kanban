let router = require('express').Router()
let Tasks = require('../models/task')

router.post('/:listId', (req, res, next) => {
  // @ts-ignore
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

router.post('/comments/:taskId', (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(task => {
      task.comments = task.comments.concat(req.body)
      const comment = task.comments[task.comments.length - 1]
      task.save(err => {
        if (err) {
          return next(err)
        }
        res.send(comment)
      })
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})
router.delete('/comments/:taskId/:commentId', (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(task => {
      task.comments.id(req.params.commentId).remove(err => {
        if (err) {
          return next(err)
        }
      })
      task.save()
      res.send({ message: "Beleted" })
    })
})

router.delete('/:taskId', (req, res, next) => {
  Tasks.findByIdAndRemove(req.params.taskId)
    .then(() => {
      res.send({ message: "Delorted" })
    })
})

router.get('/:listId', (req, res, next) => {
  // @ts-ignore
  Tasks.find({ authorId: req.session.uid, listId: req.params.listId })
    .then(tasks => {
      res.send(tasks)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

router.put('/:taskId', (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(task => {
      // @ts-ignore
      if (!task.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      task.update(req.body, (err) => {
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


module.exports = router