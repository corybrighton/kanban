let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'List'

let Tasks = require('../models/task')

let schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })

schema.pre('remove', function (next) {
  Promise.all([
    Tasks.deleteMany({ listId: this._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model(schemaName, schema)