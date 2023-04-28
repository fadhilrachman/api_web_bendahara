import { Request } from "express";

export const responGet = (
  res: Request,
  statusCode: number,
  message: string,
  data: any
) => {
  return res.status(statusCode).json({ message, data });
};

export const responCreate = (
  res: Request,
  statusCode: number,
  message: string,
  data: any
) => {
  return res.status(statusCode).json({ message, data });
};
