import jwt from "jsonwebtoken";
import User from "../api/user/model";
import { Request, Response, NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);
  try {
    jwt.verify(
      token,
      "aaofnasfasd.1ef.24tredr4t2redc42te",
      async (err, decode) => {
        if (err) return res.sendStatus(403);
        const checkUser = await User.findOne({ email: decode.email });
        if (!checkUser || token !== checkUser?.token)
          return res.sendStatus(403);
        next();
      }
    );
  } catch (error) {}
};

export default verifyToken;
