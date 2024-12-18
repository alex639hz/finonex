import * as  lineReader from 'line-reader'
import pg from 'pg'
const { Client } = pg

const OPS = {
  ADD: 'add_revenue',
  SUBTRACT: 'subtract_revenue'
}

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5432,
})
await client.connect()

const filename = process.argv[2]
console.log(`Start Processing ${filename}`)

let result = await client.query('SELECT * FROM users_revenue;')
result.rows.forEach(row => console.log(row))
console.log('--- Processing Started ---')

lineReader.eachLine(filename, async function (line, last) {
  // console.log(`Processing: ${line}`)

  const event = JSON.parse(line)

  // verify event name is correct
  if (!Object.values(OPS).includes(event.name)) {
    console.log(`Event Err: ${event}`)
    return -1;
  }

  if (event.name === OPS.SUBTRACT) {
    event.value = (Math.abs(event.value)) * (-1)
  }

  const query = `UPDATE users_revenue
  SET revenue  = revenue + ${event.value}
  WHERE user_id = '${event.userId}'
  RETURNING *;`
  console.log(query)

  await client.query(query)

  if (last) {
    console.log('--- Processing Finished ---')
    result = await client.query('SELECT * FROM users_revenue;')
    result.rows.forEach(row => console.log(row))
    await client.end()
  }
});



