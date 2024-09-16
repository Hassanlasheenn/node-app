import express from 'express';
import mongoose from 'mongoose';
import redis from 'redis';
import { Client } from 'pg';

//init app
const PORT = process.env.PORT || 4000;
const app = express();

//connect to redis
const REDIS_PORT = '6379';
const REDIS_HOST = 'redis';
const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', (err) => console.log('redis client error', err));
redisClient.on('connect', () => console.log('connected to redis'));

redisClient.connect();


// connect to postgres db
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 5432;
const DB_HOST = 'postgres';

const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const client = new Client({
  connectionString: URI,
});

client
  .connect()
  .then(() => console.log('connected to postgres database'))
  .catch((err) => console.log('failed to connect to postgres db', err));




//connect to mongo db
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 27017;
// const DB_HOST = 'mongo';

// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose
//   .connect(URI)
//   .then(() => console.log('connected to database'))
//   .catch((err) => console.log('failed to connect to db', err));

app.get('/', (req, res) => {
  redisClient.set('products', 'products...');
  res.send('<h1>Hey Hassan!</h1>');
});

app.get('/data', async (req, res) => {
  const products = await redisClient.get('products');
  res.send(`<h1>Hey Hassan!</h1> <h2>${products}</h2>`);
});

app.listen(PORT, () => console.log(`app is up and running on port ${PORT}`));
