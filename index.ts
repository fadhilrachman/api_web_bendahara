import express from "express";
import db from "./database/index.js";
import userRouter from "./api/user/router";
import pemasukanRouter from "./api/pemasukan/router";
import pengeluaranRouter from "./api/pengeluaran/router";

const app = express();

app.use(express.json());
db.on("open", () => {
  app.listen(3000, () => {
    console.log("database berhasil tersambung");
  });
  app.use(userRouter);
  app.use(pemasukanRouter);
  app.use(pengeluaranRouter);
});

db.on("error", () => {
  console.log("database tidak tersambung");
});
