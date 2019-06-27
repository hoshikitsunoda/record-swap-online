const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema(
  {
    artist: String,
    title: String,
    mediaCondition: String,
    coverCondition: String,
    format: String,
    label: String,
    price: Number,
    filename: String,
    phone: String,
    comment: String
  },
  {
    collection: 'items'
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Record', DataSchema)
