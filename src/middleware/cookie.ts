import { Request, Response, NextFunction } from "express"

export const cookieValidate = (req:Request, res: Response, next: NextFunction) => {
  next()
}