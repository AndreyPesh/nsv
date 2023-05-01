import express, { Request, json } from 'express';
import cookieParser from 'cookie-parser';
import { STATUS_CODE } from '../utils/constants/enums';
import { ResponseServer } from '../utils/types';
import { errorHandler } from '../middleware/errorHandler';
import authRouter from '../routes/auth';

const app = express();
app.use(cookieParser());
app.use(json());

app.use('/auth', authRouter);

app.all('*', (req: Request, res: ResponseServer) => {
  res.status(STATUS_CODE.NOT_FOUND);
  res.json({ status: STATUS_CODE.NOT_FOUND, message: 'Page not found' });
});

app.use(errorHandler);

export default app;
