import express from "express";
import { getAllData, createData, updateData, deleteData } from "./controller";
const router = express();

router.get("/pemasukan", getAllData);
router.post("/pemasukan", createData);
router.put("/pemasukan/:id", updateData);
router.delete("/pemasukan/:id", deleteData);

export default router;
