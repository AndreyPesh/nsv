import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { logger } from '../middleware/logger';
import { cookieValidate } from '../middleware/cookie';
import { fakeError } from '../middleware/error';

const app = express();
app.use(cookieParser());
app.use(logger);
app.use(cookieValidate);

app.get('/error', fakeError);

const router = express.Router();

// predicate the router with a check and bail out when needed
router.use((req, res, next) => {
  if (!req.headers['x-auth']) return next('router');
  next();
});

router.get('/user/:id', (req, res) => {
  res.status(200);
  res.setHeader('Content-type', 'application/json');
  res.send({user: 'hello, user!'});
});

// use the router and 401 anything falling through
app.use('/admin', router, (req, res) => {
  res.sendStatus(401);
});

app.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.method);
    next();
  },
  (req, res, next) => {
    console.log(`Time: ${Date.now()}`);
    // throw new Error('Error did throw')
    next();
  }
);

app.get('/', (req, res) => res.send({ user: 'User' }));

app.get('/user/:id', (req, res) => {
  res.send({ user: req.params.id });
});

app.all('*', (req, res) => {
  const t = req.time;
  console.log('Time all routes: ', req.time);

  res.sendStatus(404);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error catch');

  res.status(500).send('Server internal error');
});

export default app;
