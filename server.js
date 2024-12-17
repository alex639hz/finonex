import { createWriteStream } from 'fs'
import express from 'express';
const app = express();
const port = 3000;
const filename = 'localDb.txt';

app.use(verifyTokenMiddleware);

app.post("/liveEvent", (req, res) => {
  req
    .pipe(createWriteStream(filename, { flags: 'a' }))
    .on('finish', () => {
      console.log(`File saved: ${filename}: ${req.body}`)
      res.send("liveEvent registered successfully");
    })
});





app.get("/", (req, res) => {
  res.send("hello");
});

app.use('*', (req, res) => {
  res.status(400).send({ error: 'incorrect URL - returned by catch-all handler' })
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message })
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message })
    console.log(err)
  }
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
