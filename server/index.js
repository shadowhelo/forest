import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { MongoClient, ObjectID } from 'mongodb'

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'forest'

const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(cors())

app.get('/status', (req, res) => res.status(200).send({ msg: 'OK' }))

app.post('/api', async (req, res) => {
  await client.connect()
  const db = await client.db(dbName)
  const { query, options } = req.body

  console.dir(query, options)

  const animalsCollection = await db.collection('animals')
  const buildingsCollection = await db.collection('buildings')
  const camerasCollection = await db.collection('cameras')

  const animalsResult = await animalsCollection.find(query, options)
  const buildingsResult = await buildingsCollection.find(query, options)
  const camerasResult = await camerasCollection.find(query, options)

  const animals = await animalsResult.toArray()
  const buildings = await buildingsResult.toArray()
  const cameras = await camerasResult.toArray()

  console.dir({ animals, buildings, cameras })

  res.status(200).send({ animals, buildings, cameras })
  await client.close()
})

app.post('/history', async (req, res) => {
  await client.connect()
  const db = await client.db(dbName)
  const { query, options } = req.body

  console.dir(query, options)

  const animalsCollection = await db.collection('animals')

  const animalsResult = await animalsCollection.find({ _id:ObjectID(query._id) }, options)

  const animals = await animalsResult.toArray()

  console.dir({ animals })

  res.status(200).send({ animals })
  await client.close()
})

app.listen(port, () => console.log(`🐘 listening on ${port}`))
