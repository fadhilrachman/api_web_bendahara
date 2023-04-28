import express from "express";
import { getAllData, createData, updateData } from "./controller";
const router = express();

router.get("/pengeluaran", getAllData);
router.post("/pengeluaran", createData);
router.put("/pengeluaran/:id", updateData);

export default router;
