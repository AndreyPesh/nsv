import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser'
import { logger } from './middleware/logger';
import { cookieValidate } from './middleware/cookie';


const PORT = process.env.PORT || 4000;

const app = express();
app.use(cookieParser())
app.use(logger)
app.use(cookieValidate)

app.get('/', (req, res) => res.send({ user: 'User' }));

app.get('/user/:id', (req, res) => {
  console.log(req.params);
  res.send({ user: 'User' });
});

app.all('*', (req, res) => {
  const t = req.time
  console.log('Time: ', req.time);
  
  res.sendStatus(404);
});

app.listen(PORT, () => console.log(`Server start on ${PORT} port`));
