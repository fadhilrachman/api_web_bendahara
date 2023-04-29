import User from "./model";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { responGet, responCreate } from "../../utils/respon";
import jwt from "jsonwebtoken";

interface Register {
  t7t;
  nama: string;
  is_admin?: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface Login {
  email: string;
  password: string;
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

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser)
      return res.status(404).json({ message: "email belum terdaftar" });

    bcrypt.compare(password, checkUser?.password, async (err, isMatch) => {
      console.log({ isMatch });
      console.log({ err });

      if (isMatch) {
        const token = await jwt.sign(
          { email, password },
          "aaofnasfasd.1ef.24tredr4t2redc42te",
          { expiresIn: "1d" }
        );
        const user = await User.findOneAndUpdate(
          { email },
          { token },
          { new: true }
        );
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ message: "login success", user });
      } else {
        res.status(200).json({ message: "login error" });
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllData, createData, login };
