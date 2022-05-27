import { readFile } from 'fs/promises'


const fileReader = async filename => {
  const data = await readFile(filename, 'UTF-8')
  return data
}

export default fileReader
