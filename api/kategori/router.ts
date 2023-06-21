import express from "express";
import {
  getAllData,
  createData,
  deleteData,
  updateData,
  getOneData,
} from "./controller";
const router = express();

router.get("/categories", getAllData);
router.post("/categories", createData);
router.get("/categories/:id", getOneData);
router.put("/categories/:id", updateData);
router.delete("/categories/:id", deleteData);

export default router;
