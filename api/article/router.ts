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

router.get("/article", getAllData);
router.post("/article", createData);
router.put("/article/:id", updateData);
router.get("/article/:id", getOneData);
router.delete("/article/:id", deleteData);

export default router;
