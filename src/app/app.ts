import express, { Request, json } from 'express';
import cookieParser from 'cookie-parser';
import { STATUS_CODE } from '../utils/constants/enums';
import { ResponseServer } from '../utils/types';
import { errorHandler } from '../middleware/errorHandler';
import authRouter from '../routes/auth';
import refreshRouter from '../routes/refresh';
import { verifyJWT } from '../middleware/verifyJWT';

const app = express();
app.use(cookieParser());
app.use(json());

app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);

app.use(verifyJWT)

app.get('/test', (req: Request, res: ResponseServer) => {
  res.json({status: STATUS_CODE.OK, message: 'test'})
})


app.all('*', (req: Request, res: ResponseServer) => {
  res.status(STATUS_CODE.NOT_FOUND);
  res.json({ status: STATUS_CODE.NOT_FOUND, message: 'Page not found' });
});

app.use(errorHandler);

export default app;
