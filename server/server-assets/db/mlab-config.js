var mongoose = require('mongoose')
var connectionString = 'mongodb://student1:student1@ds159772.mlab.com:59772/boards'
var connection = mongoose.connection


mongoose.connect(connectionString, { useMongoClient: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})