import { parse } from 'csv-parse/sync'


const toSchema = (latest, records, name) => ({
  collection: 'cameras',
  name: name.split('.').at(0),
  identifier: latest.id,
  lat: latest.lat,
  long: latest.long,
  desc: latest.desc,
  history: []
})


const normalise = async (csv, name) => {
  const records = await parse(csv, {
    columns: true,
    skip_empty_lines: true
  })
  return toSchema(records.at(-1), records, name)
}

export default normalise
