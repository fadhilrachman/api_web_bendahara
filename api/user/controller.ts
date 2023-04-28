import User from "./model";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { responGet, responCreate } from "../../utils/respon";

interface Register {
  nama: string;
  is_admin?: string;
  email: string;
  password: string;
  confirm_password: string;
}

const getAllData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await User.find();
    responGet(res, 200, "succes get data", data);
  } catch (error) {
    next(error);
  }
};

const createData = async (
  req: Request<{}, {}, Register>,
  res: Response,
  next: NextFunction
) => {
  const { nama, is_admin, password, confirm_password, email } = req.body;

  try {
    if (password !== confirm_password)
      return res.status(400).json({ message: "password error" });

    const checkEmail = await User.findOne({ email });
    if (checkEmail)
      return res.status(400).json({ message: "email sudah terdaftar" });
    const salt = bcrypt.genSaltSync(10);
    const bcryptPassword = bcrypt.hashSync(password, salt);
    const data = await User.create({
      nama,
      is_admin,
      email,
      password: bcryptPassword,
    });
    responCreate(res, 201, "succes create data", data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllData, createData };
