import { readdir } from 'fs/promises'
import fileReader from './file-reader.js'
import normaliseAnimals from './normalise-animals.js'
import normaliseBuildings from './normalise-buildings.js'
import normaliseCameras from './normalise-cameras.js'
import insertData from './insert-data.js'

const sliceLength = 35
const niceSlice = str => str.length > sliceLength
  ? str.slice(0, sliceLength)
  : str + '.'.repeat(sliceLength - str.length)


try {
  const allAnimalNames = await readdir('../csv/animals/')
  const animals = []
  for await (const animal of allAnimalNames) {
    console.time(niceSlice(`Preparing to parse "${animal}"`))
    const animalCSV = await fileReader(`../csv/animals/${animal}`)
    console.timeEnd(niceSlice(`Preparing to parse "${animal}"`))
    const normalisedAnimal = await normaliseAnimals(animalCSV, animal)
    animals.push(normalisedAnimal)
  }

  const allBuildingNames = await readdir('../csv/buildings/')
  const buildings = []
  for await (const building of allBuildingNames) {
    console.time(niceSlice(`Preparing to parse "${building}"`))
    const buildingCSV = await fileReader(`../csv/buildings/${building}`)
    console.timeEnd(niceSlice(`Preparing to parse "${building}"`))
    const normalisedBuilding = await normaliseBuildings(buildingCSV, building)
    buildings.push(normalisedBuilding)
  }

  const allCameraNames = await readdir('../csv/cameras/')
  const cameras = []
  for await (const camera of allCameraNames) {
    console.time(niceSlice(`Preparing to parse "${camera}"`))
    const cameraCSV = await fileReader(`../csv/cameras/${camera}`)
    console.timeEnd(niceSlice(`Preparing to parse "${camera}"`))
    const normalisedCamera = await normaliseCameras(cameraCSV, camera)
    cameras.push(normalisedCamera)
  }

  const { animalsCount, buildingsCount, camerasCount } = await insertData(animals, buildings, cameras)
  console.log(`Inserted ${animalsCount.insertedCount} animals, ${buildingsCount.insertedCount} buildings, ${camerasCount.insertedCount} cameras`)
} catch (err) {
  console.dir({ err })
}
