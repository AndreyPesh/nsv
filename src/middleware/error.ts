import { Request, Response, NextFunction } from 'express';

export const fakeError = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  console.log('Inside fakeError');
  
await Promise.all([new Promise((res, rej) => {
  const isError = Math.random() > 0.5
  if(isError) {
    setTimeout(() => rej('Reject my promise'), 1000);
    return;
  } else {
    setTimeout(() => res('Allowed'), 1000);
    resp.send('Error did not throw')
  }
}).catch((err) => next(err))])
};
