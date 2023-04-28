import express from "express";
import db from "./database/index.js";
import userRouter from "./api/user/router";
import pemasukanRouter from "./api/pemasukan/router";

const app = express();

app.use(express.json());
db.on("open", () => {
  app.listen(3000, () => {
    console.log("database berhasil tersambung");
  });
  app.use(userRouter);
  app.use(pemasukanRouter);
});

db.on("error", () => {
  console.log("database tidak tersambung");
});
