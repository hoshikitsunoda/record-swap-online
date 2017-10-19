const express = require('express')
const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost/library'
const uuidv4 = require('uuid/v4')
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

const twilio = require('twilio')
const accountSid = process.env.accountSid
const authToken = process.env.authToken

const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public/uploads')))

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const inventoryItems = db.collection('items')
  const messages = db.collection('messages')

  app.post('/inventory', upload.single('photo'), (req, res) => {
    inventoryItems
      .insertOne(Object.assign({ _id: uuidv4() }, req.body, req.file))
      .then((result) => res.status(201).json(result.ops[0]))
      .catch((err) => {
        console.error(err)
        res.sendStatus(500)
      })

    const client = new twilio(accountSid, authToken)
    const phoneNumber = process.env.phoneNumber

    client.messages.create({
      body: 'Thank you for submitting ' + req.body.artist + '/' + req.body.title + '.',
      to: '1' + req.body.phone,
      from: phoneNumber
    }).then((message) => console.log(message.sid))
  })
  app.post('/message', (req, res) => {
    messages
      .insertOne(Object.assign({ _id: uuidv4() }, req.body))
      .then((result) => res.status(201).json(result.ops[0]))
      .catch((err) => {
        console.error(err)
        res.sendStatus(500)
      })

    const client = new twilio(accountSid, authToken)
    const phoneNumber = process.env.phoneNumber
    const message = (name, artist, title, contact, message) => {
      return 'You have an inquiry from ' + name + ' for ' + artist + '/' + title + '.' + '\n' + 'Buyer contact: ' + contact + '\n' + 'Message from the buyer: ' + message
    }

    client.messages.create({
      body: message(req.body.name, req.body.artist, req.body.title, req.body.contact, req.body.message),
      to: '1' + req.body.phone,
      from: phoneNumber
    }).then((message) => console.log(message.sid))
  })
  app.get('/inventory', (req, res) => {
    inventoryItems
      .find({})
      .toArray()
      .then((contents) => res.json(contents))
      .catch((err) => {
        console.error(err)
        res.sendStatus(500)
      })
  })
  app.get('/inventory/:id', (req, res) => {
    const itemId = { _id: req.params.id }
    inventoryItems
      .findOne(itemId)
      .then((contents) => res.json(contents))
      .catch((err) => {
        console.error(err)
        res.sendStatus(500)
      })
  })
  app.get('/message', (req, res) => {
    messages
      .find({})
      .toArray()
      .then((contents) => res.json(contents))
      .catch((err) => {
        console.error(err)
        res.sendStatus(500)
      })
  })
  app.delete('/inventory/:id', (req, res) => {
    const itemId = { _id: req.params.id }
    inventoryItems
      .deleteOne(itemId)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.error(err)
        res.sendStatus(400)
      })
  })
  app.delete('/message/:id', (req, res) => {
    const itemId = { _id: req.params.id }
    messages
      .deleteOne(itemId)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.error(err)
        res.sendStatus(400)
      })
  })
  app.listen('3000', () => console.log('Listening on port 3000'))
})

console.log(process.env.accountSid, process.env.authToken, process.env.phoneNumber)
