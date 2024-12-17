import { createWriteStream } from 'fs'
import express from 'express';
import jsonl from 'jsonl';
const app = express();
const port = 3000;
const filename = 'localDb.log';

app.use(verifyTokenMiddleware);

app.post("/liveEvent", (req, res) => {
  req
    .pipe(jsonl({ toBufferStream: 1 }))
    .pipe(createWriteStream(filename, { flags: 'a' }))
    .on('finish', () => {
      console.log(`Event saved to: ${filename}`)
      res.send("liveEvent registered successfully");
    })
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.use('*', (req, res) => {
  res.status(400).send({ error: 'incorrect URL - returned by catch-all handler' })
})

app.listen(port, console.log('server started'))

// util functions 
function verifyTokenMiddleware(req, res, next) {
  const { authorization } = req.headers;
  if (authorization != 'secret') {
    console.log(`${Date()} unauthorised attempt`);
    return res.status(401).json({ msg: "Unauthorized" });
  }
  next()
};
