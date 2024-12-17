import { request } from 'http'
import { createReadStream } from 'fs'
import * as  lineReader from 'line-reader'

const filename = process.argv[2]
console.log(`start ${filename}`)
lineReader.eachLine(filename, function (line, last) {
  console.log(`Processing: ${line}`);
  // req.write(line);
  if (last) {
    console.log('Completed!');
    // req.end();
  }
});