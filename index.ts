import express from "express";
import db from "./database/index.js";
import userRouter from "./api/user/router";
import pemasukanRouter from "./api/pemasukan/router";
import pengeluaranRouter from "./api/pengeluaran/router";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
db.on("open", () => {
  app.listen(4000, () => {
    console.log("database berhasil tersambung");
  });
  app.use(userRouter);
  app.use(pemasukanRouter);
  app.use(pengeluaranRouter);
});

db.on("error", () => {
  console.log("database tidak tersambung");
});
