import { request } from 'http'
import { createReadStream } from 'fs'
import * as  lineReader from 'line-reader'

const filename = 'events.jsonl'
const hostname = `localhost`

const options = {
  hostname,
  port: 3000,
  path: `/liveEvent`,
  method: 'POST',
  headers: {
    'Authorization': 'secret',
  },
};

const req = request(options, (res) => {
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(chunk);
  });
});
// ---------------
lineReader.eachLine(filename, function (line, last) {
  console.log(`Event: ${line}`);
  req.write(line);
  if (last) {
    console.log('End Of File');
    req.end();
  }
});