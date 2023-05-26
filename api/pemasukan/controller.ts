import Pemasukan from "./model";
import { Request, Response, NextFunction } from "express";
import { responGet, responCreate } from "../../utils/respon";
import createPagination from "../../utils/pagination";

interface ReqBody {
  tanngal: string;
  total_pemasukan: number;
  deskripsi: string;
}

export const getAllData = async (
  req: Request<
    {},
    { limit: number; page: number; search: string; tanggal: string },
    {}
  >,
  res: Response,
  next: NextFunction
) => {
  const { limit, page, search = "", tanggal = "" } = req.query;
  const startDate = new Date(tanggal); // Tanggal mulai rentang
  const endDate = new Date();
  let filter: any = {};

  if (tanggal) {
    filter.tanggal = { $gte: startDate, $lte: endDate };
  }
  if (search) {
    filter.tanggal = { $regex: search, $options: "i" };
  }
  console.log({ filter });

  try {
    const data = await Pemasukan.find(filter)
      .sort({ tanggal: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const count = await Pemasukan.count(filter);
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
    const data = await Pemasukan.create(req.body);
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
    const data = await Pemasukan.findByIdAndUpdate(id, req.body, { new: true });
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
    const data = await Pemasukan.findByIdAndDelete(id);
    if (!data) return res.status(404).json({ message: "id error" });
    responCreate(res, 200, "succes delete data", data);
  } catch (error) {
    next(error);
  }
};
