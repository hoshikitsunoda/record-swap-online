const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uuidv4 = require('uuid/v4')

const DataSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    artist: String,
    title: String,
    format: String,
    price: Number,
    filename: String
  },
  {
    collection: 'cartItems'
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('CartItem', DataSchema)
