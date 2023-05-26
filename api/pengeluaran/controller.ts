import Pengeluaran from "./model";
import { Request, Response, NextFunction } from "express";
import { responGet, responCreate } from "../../utils/respon";
import createPagination from "../../utils/pagination";
interface ReqBody {
  tanngal: string;
  total_pengeluaran: number;
  deskripsi: string;
}

export const getAllData = async (
  req: Request<{}, { limit: number; page: number }, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, page } = req.query;

    const data = await Pengeluaran.find().limit(2);
    const count = await Pengeluaran.count();
    const total_page = Math.ceil(count / limit);
    const pagination = createPagination(page, total_page);

    responGet(res, 200, "succes get data", data, count, pagination);
  } catch (error) {
    next(error);
  }
};

export const createData = async (
  req: Request<{}, {}, ReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Pengeluaran.create(req.body);
    responCreate(res, 200, "succes create data", data);
  } catch (error) {
    next(error);
  }
};

export const updateData = async (
  req: Request<{ id: string }, {}, ReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const data = await Pengeluaran.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!data) return res.status(404).json({ message: "id error" });
    responCreate(res, 200, "succes update data", data);
  } catch (error) {
    next(error);
  }
};
export const deleteData = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const data = await Pengeluaran.findByIdAndDelete(id);
    if (!data) return res.status(404).json({ message: "id error" });
    responCreate(res, 200, "succes delete data", data);
  } catch (error) {
    next(error);
  }
};
