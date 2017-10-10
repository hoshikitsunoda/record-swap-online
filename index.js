const express = require('express')
const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost/library'
const uuidv4 = require('uuid/v4')
const path = require('path')

const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const inventoryItems = db.collection('items')

  app.get('/inventory', (req, res) => {
    inventoryItems
      .find({})
      .toArray()
      .then(contents => res.json(contents))
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })

  app.post('/inventory', (req, res) => {
    inventoryItems
      .insertOne(Object.assign({ _id: uuidv4() }, req.body))
      .then((result) => res.status(201).json(result.ops[0]))
      .catch((err) => {
        console.error(err)
        res.sendStatus(500)
      })
  })
  app.listen('3000', () => console.log('Listening on port 3000'))
})
