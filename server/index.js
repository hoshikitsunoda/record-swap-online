const express = require('express')
const url = 'mongodb://localhost/photos'
// const password = process.env.password
// const url =
//   `mongodb+srv://hoshki:${password}@rsd-3tupd.mongodb.net/test?retryWrites=true&w=majority`
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.slice(0, -4) + '-' + Date.now() + '.jpg')
  }
})
const upload = multer({ storage: storage })
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')

const Record = require('./data')
const Message = require('./message')
const CartItem = require('./cartItem')

let dbs = mongoose.connection
dbs.once('open', () => console.log('connected to DB!'))
dbs.on('error', console.error.bind(console, 'DB connection error:'))

// const twilio = require('twilio')
// const accountSid = process.env.accountSid
// const authToken = process.env.authToken

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(path.join(__dirname, '../public/uploads')))
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    req.header('origin') ||
      req.header('x-forwarded-host') ||
      req.header('referer') ||
      req.header('host')
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

mongoose.connect(url, { useNewUrlParser: true }, (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  app.post('/inventory', upload.single('photo'), (req, res) => {
    const {
      _id,
      artist,
      title,
      mediaCondition,
      coverCondition,
      format,
      label,
      price,
      phone,
      comment
    } = req.body

    const { filename } = req.file
    const newPost = new Record({
      _id,
      artist,
      title,
      mediaCondition,
      coverCondition,
      format,
      label,
      price,
      filename,
      phone,
      comment
    })

    newPost.save(err => {
      if (err) return res.json({ success: false, error: err })
      return res.send({
        success: true,
        message: 'Post saved successfully!'
      })
    })
  })
  app.post('/message', (req, res) => {
    const { artist, title, phone, message, name, contact } = req.body

    const newMessage = new Message({
      artist,
      title,
      phone,
      message,
      name,
      contact
    })

    newMessage.save(err => {
      if (err) return res.json({ success: false, error: err })
      return res.send({
        success: true,
        message: 'Message saved successfully!'
      })
    })

    // const client = new twilio(accountSid, authToken)
    // const phoneNumber = process.env.phoneNumber

    // client.messages
    //   .create({
    //     body: `You have an inquiry from ${name} for ${artist}/${title}. <br>Buyer contact: ${contact}. <br>Message from the buyer: ${message}`,
    //     to: '1' + phone,
    //     from: phoneNumber
    //   })
    //   .then(message => console.log(message.sid))
  })
  app.post('/cart', (req, res) => {
    const { artist, title, format, price, filename } = req.body

    const shoppingCart = new CartItem({
      artist,
      title,
      format,
      price,
      filename
    })

    shoppingCart.save(err => {
      if (err) return res.json({ success: false, error: err })
      return res.send({
        success: true,
        message: 'Item added to cart successfully!'
      })
    })
  })
  app.get('/inventory', (req, res) => {
    Record.find((err, data) => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true, data: data })
    })
  })
  app.get('/inventory/:id', (req, res) => {
    const itemId = { _id: req.params.id }
    Record.findOne(itemId, (err, data) => {
      console.log(data)
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true, data: data })
    })
  })
  app.get('/cart', (req, res) => {
    CartItem.find((err, data) => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true, data: data })
    })
  })
  app.get('/message', (req, res) => {
    Message.find((err, data) => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true, data: data })
    })
  })
  app.delete('/inventory/:id', (req, res) => {
    const itemId = { _id: req.params.id }
    Record.deleteOne(itemId, err => {
      if (err) return res.send({ success: false, error: err })
      return res.send({ success: true, message: 'Item Deleted Successfully!' })
    })
  })
  app.delete('/message/:id', (req, res) => {
    const itemId = { _id: req.params.id }
    Message.deleteOne(itemId, err => {
      if (err) return res.send({ success: false, error: err })
      return res.send({ success: true, message: 'Item Deleted Successfully!' })
    })
  })
  app.listen('5000', () => console.log('Listening on port 5000'))
})

// console.log(
//   process.env.accountSid,
//   process.env.authToken,
//   process.env.phoneNumber
// )
