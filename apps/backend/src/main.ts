/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.gif',
  '.jpeg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
  '.pdf',
];

const app = express();

app.use(express.static(__dirname + process.env.CLIENT));
app.use(
  '/backend-assets',
  express.static(path.join(__dirname, 'backend-assets'))
);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.get('*', function (req, res) {
  if (allowedExt.filter((ext) => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(process.env.CLIENT + `/${req.url}`));
  } else {
    res.sendFile('index.html', { root: process.env.CLIENT });
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
