import Article from "./model";
import { Request, Response, NextFunction } from "express";
import { responGet, responCreate } from "../../utils/respon";
import createPagination from "../../utils/pagination";

interface ReqBody {
  tanngal: string;
  judul: string;
  link: string;
  kategori: string;
}

export const getAllData = async (
  req: Request<
    {},
    {
      limit: number;
      page: number;
      search: string;
      tanggal: string;
      kategori: string;
    },
    {}
  >,
  res: Response,
  next: NextFunction
) => {
  const { limit, page, search, tanggal, kategori } = req.query;
  const startDate = new Date(tanggal);
  const endDate = new Date();
  let filter: any = {};

  switch (true) {
    case !!tanggal:
      filter.tanggal = { $gte: startDate, $lte: endDate };
      break;
    case !!search:
      filter.judul = { $regex: search, $options: "i" };
      break;
    case !!kategori:
      filter.kategori = kategori;
      break;
    default:
      break;
  }

  try {
    const data = await Article.find(filter)
      .select("-__v")
      .populate({ path: "kategori" })
      .sort({ tanggal: -1 })
      .skip(page && (page - 1) * limit)
      .limit(limit)
      .lean();
    const count = await Article.count(filter);
    const total_page = Math.ceil(count / limit);

    const pagination = createPagination(page, total_page, limit);

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
    const data = await Article.create(req.body);
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
    const data = await Article.findByIdAndUpdate(id, req.body, { new: true });
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
    const data = await Article.findByIdAndDelete(id);
    if (!data) return res.status(404).json({ message: "id error" });
    responCreate(res, 200, "succes delete data", data);
  } catch (error) {
    next(error);
  }
};
export const getOneData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const data = await Article.findById(id);
    if (!data) return res.status(404).json({ message: "id not found" });
    res.status(201).json({ message: "succes get data", data });
  } catch (error) {
    next(error);
  }
};
