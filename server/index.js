const express = require('express')
// const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost/photos'
// const uuidv4 = require('uuid/v4')
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
const Record = require('./data')
const Message = require('./message')

let dbs = mongoose.connection
dbs.once('open', () => console.log('connected to DB!'))
dbs.on('error', console.error.bind(console, 'DB connection error:'))

// const twilio = require('twilio')
// const accountSid = process.env.accountSid
// const authToken = process.env.authToken

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../public/uploads')))

mongoose.connect(url, { useNewUrlParser: true }, (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const messages = db.collection('messages')

  app.post('/inventory', upload.single('photo'), (req, res) => {
    const {
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
    // messages
    //   .insertOne(Object.assign({ _id: uuidv4() }, req.body))
    //   .then(result => res.status(201).json(result.ops[0]))
    //   .catch(err => {
    //     console.error(err)
    //     res.sendStatus(500)
    //   })

    // const client = new twilio(accountSid, authToken)
    // const phoneNumber = process.env.phoneNumber
    // const message = (name, artist, title, contact, message) => {
    //   return (
    //     'You have an inquiry from ' +
    //     name +
    //     ' for ' +
    //     artist +
    //     '/' +
    //     title +
    //     '.' +
    //     '\n' +
    //     'Buyer contact: ' +
    //     contact +
    //     '\n' +
    //     'Message from the buyer: ' +
    //     message
    //   )
    // }

    // client.messages
    //   .create({
    //     body: message(
    //       req.body.name,
    //       req.body.artist,
    //       req.body.title,
    //       req.body.contact,
    //       req.body.message
    //     ),
    //     to: '1' + req.body.phone,
    //     from: phoneNumber
    //   })
    //   .then(message => console.log(message.sid))
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
  app.get('/message', (req, res) => {
    messages
      .find({})
      .toArray()
      .then(contents => res.json(contents))
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })
  app.delete('/inventory/:id', (req, res) => {
    const itemId = { _id: req.params.id }
    Record.remove(itemId, err => {
      if (err) return res.send({ success: false, error: err })
      return res.send({ success: true, message: 'Item Deleted Successfully!' })
    })
  })
  app.delete('/message/:id', (req, res) => {
    const itemId = { _id: req.params.id }
    messages
      .deleteOne(itemId)
      .then(() => res.sendStatus(204))
      .catch(err => {
        console.error(err)
        res.sendStatus(400)
      })
  })
  app.listen('3000', () => console.log('Listening on port 3000'))
})

// console.log(
//   process.env.accountSid,
//   process.env.authToken,
//   process.env.phoneNumber
// )
