import express from "express";
import {
  getAllData,
  createData,
  updateData,
  deleteData,
  getOneData,
} from "./controller";
// import from "../../utils/middleware";
const router = express();

router.get("/income", getAllData);
router.post("/income", createData);
router.put("/income/:id", updateData);
router.get("/income/:id", getOneData);
router.delete("/income/:id", deleteData);

export default router;
