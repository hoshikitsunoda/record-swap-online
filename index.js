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
const accountSid = 'AC64c0e0345125c81ab87e3a98664378f4'
const authToken = '17d1782ce5f40c3c66da56cd5eaca658'

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

  app.post('/inventory', upload.single('photo'), (req, res) => {
    console.log(req.body)
    console.log(req.file)

    inventoryItems
      .insertOne(Object.assign({ _id: uuidv4() }, req.body, req.file))
      .then((result) => res.status(201).json(result.ops[0]))
      .catch((err) => {
        console.error(err)
        res.sendStatus(400)
      })

    const client = new twilio(accountSid, authToken)

    client.messages.create({
      body: 'Thank you for submitting ' + req.body.artist + '/' + req.body.title + '.',
      to: '1' + req.body.phone,
      from: '+15624554754'
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
  app.listen('3000', () => console.log('Listening on port 3000'))
})
