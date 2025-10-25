import { NextFunction, Request, Response } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log("checking if session exists");
  if (!req.auth?.sessionId) {
    return next(new Error("Meddleware error"));
  }
  next();
};
