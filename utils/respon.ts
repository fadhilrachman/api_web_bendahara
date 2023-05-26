import { Response } from "express";

interface Pagination {
  total_page: number;
  next: number;
  previoes: number;
}
export const responGet = (
  res: Response,
  statusCode: number,
  message: string,
  data: any,
  count: number,
  pagination: Pagination
) => {
  return res.status(statusCode).json({ message, count, pagination, data });
};

export const responCreate = (
  res: Response,
  statusCode: number,
  message: string,
  data: any
) => {
  return res.status(statusCode).json({ message, data });
};
