import { Request, Response, NextFunction } from "express";
import { responGet } from "../../utils/respon";
import createPagination from "../../utils/pagination";
import Kategori from "./model";

const getAllData = async (
  req: Request<
    {},
    {
      limit: number;
      page: number;
    },
    {}
  >,
  res: Response,
  next: NextFunction
) => {
  const { limit, page } = req.query;

  try {
    const data = await Kategori.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const count = await Kategori.count();
    const total_page = Math.ceil(count / limit);
    responGet(
      res,
      200,
      "succes get data",
      data,
      count,
      createPagination(page, total_page, limit)
    );
  } catch (error) {
    next(error);
  }
};

const createData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Kategori.create(req.body);
    res.status(201).json({ message: "succes create data", data });
  } catch (error) {
    next(error);
  }
};

const updateData = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const data = await Kategori.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: "id not found" });
    res.status(201).json({ message: "succes create data", data });
  } catch (error) {
    next(error);
  }
};

const deleteData = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const data = await Kategori.findByIdAndDelete(id);
    if (!data) return res.status(404).json({ message: "id not found" });
    res.status(201).json({ message: "succes create data" });
  } catch (error) {
    next(error);
  }
};

const getOneData = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const data = await Kategori.findById(id);
    if (!data) return res.status(404).json({ message: "id not found" });
    res.status(201).json({ message: "succes get data", data });
  } catch (error) {
    next(error);
  }
};

export { getAllData, createData, updateData, deleteData, getOneData };
