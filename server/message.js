const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema(
  {
    artist: String,
    title: String,
    phone: String,
    message: String,
    name: String,
    contact: String
  },
  {
    collection: 'message'
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Message', DataSchema)
