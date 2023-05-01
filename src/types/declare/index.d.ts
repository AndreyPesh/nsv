import { Express } from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    user: string;
  }
}

// import express from 'express';

// declare global {
//   namespace Express {
//     interface Request {
//       time?: number;
//     }
//   }
// }
