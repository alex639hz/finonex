import { createWriteStream } from 'fs'
import express from 'express';
import jsonl from 'jsonl';
const app = express();
const port = 3000;
const filename = 'output.log';

// verify authorisation for all routes
app.use((req, res, next) => {
  const { authorization } = req.headers;
  if (authorization != 'secret') {
    console.log(`${Date.now()} unauthorised attempt`);
    return res.status(401).send("Unauthorized");
  }
  next()
});

// register new event to local file 
app.post("/liveEvent", (req, res) => {
  req
    .pipe(jsonl({ toBufferStream: 1 }))
    .pipe(createWriteStream(filename, { flags: 'a' }))
    .on('finish', () => {
      console.log(`Event saved to: ${filename}`)
      res.send("liveEvent registered successfully");
    })
});

// return all user events from db 
app.get("/userEvent/:userId", (req, res) => {
  res.send(`Hi ${JSON.stringify(req.params.userId)}`);
});

// catch incorrect URLs
app.use('*', (req, res) => {
  res.status(400).send({ error: 'incorrect URL: ' + `${req.originalUrl}` })
})

// start server
app.listen(port, console.log('server started'))

// util functions
// function verifyTokenMiddleware;
