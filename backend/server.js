import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Data from './data.js';

import Video from './models/videoSchema.js';

// Create instance of app
const app = express();
app.use(express.json());
dotenv.config();

app.use((req, res, next) => {
  // using middleware for accepting cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  // the next allows us to move onto the next route functions
  next();
});

const port = process.env.PORT || 8000;

// Database config

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  console.log('Connected')
);

app.get('/', (req, res) => {
  res.status(200);
  res.send('Hello');
});

app.get('/v1/api/posts', (req, res) => {
  res.status(200);
  res.json(Data);
});

app.get('/v2/api/posts', (req, res) => {
  Video.find((err, data) => {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

// Post request allows us to ADD data to DB
app.post('/v2/api/posts', (req, res) => {
  const dbVideos = req.body;

  Video.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(201);
      res.send(data);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
