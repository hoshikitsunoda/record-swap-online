const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema(
  {
    _id: { type: String, unique: true },
    artist: String,
    title: String,
    phone: String,
    message: String,
    name: String,
    contact: String
  },
  {
    collection: 'items'
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Record', DataSchema)
