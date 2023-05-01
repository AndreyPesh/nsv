import { Response } from 'express';

export type ResponseServer = Response<{
  status: number;
  message: string;
  data?: unknown;
}>;
