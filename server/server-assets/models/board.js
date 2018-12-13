let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Board'

let Lists = require('../models/list')
let Tasks = require('../models/task')

let schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() },
  authorId: { type: ObjectId, ref: 'User', required: true }
})

//CASCADE ON DELETE
schema.pre('remove', function (next) {
  //find all the lists and remove them
  // @ts-ignore
  Promise.all([
    Tasks.deleteMany({ boardId: this._id }),
    Lists.deleteMany({ boardId: this.id })
  ])
    .then(() => next())
    .catch(err => next(err))
})


module.exports = mongoose.model(schemaName, schema)