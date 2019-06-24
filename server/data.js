const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema(
  {
    id: String,
    artist: String,
    title: String,
    phone: String,
    message: String,
    name: String,
    contact: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Record', DataSchema)
