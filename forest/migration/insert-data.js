import { MongoClient } from 'mongodb'
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'forest'


const collectionExists = (name, db) =>
  new Promise((resolve, reject) =>
    db.listCollections({ name })
      .next((err, collinfo) => resolve(!!collinfo)))

/**
 * @function insertData
 * @param {[Object]} animals animals to insert into the relevant collection
 * @param {[Object]} buildings buildings to insert into the relevant collection
 * @param {[Object]} cameras cameras to insert into the relevant collection
 * @return {Promise->Object}
 */
const insertData = async (animals, buildings, cameras) => {
  await client.connect()
  const db = await client.db(dbName)
  console.log('Connected to mongodb')

  const animalsExists = await collectionExists('animals', db)
  if (!animalsExists) await db.createCollection('animals')
  const animalsCollection = await db.collection('animals')
  const animalsCount = await animalsCollection.insertMany(animals)

  const buildingsExists = await collectionExists('buildings', db)
  if (!buildingsExists) await db.createCollection('buildings')
  const buildingsCollection = await db.collection('buildings')
  const buildingsCount = await buildingsCollection.insertMany(buildings)

  const camerasExists = await collectionExists('cameras', db)
  if (!camerasExists) await db.createCollection('cameras')
  const camerasCollection = await db.collection('cameras')
  const camerasCount = await camerasCollection.insertMany(cameras)

  client.close()
  return { animalsCount, buildingsCount, camerasCount }
}

export default insertData
