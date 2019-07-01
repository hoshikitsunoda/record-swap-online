const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uuidv4 = require('uuid/v4')

const DataSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
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
