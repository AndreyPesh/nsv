import { Express } from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    time: number;
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
