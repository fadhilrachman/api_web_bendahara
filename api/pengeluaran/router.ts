import express from "express";
import { getAllData, createData, updateData, deleteData } from "./controller";
const router = express();

router.get("/pengeluaran", getAllData);
router.post("/pengeluaran", createData);
router.put("/pengeluaran/:id", updateData);
router.delete("/pengeluaran/:id", deleteData);

export default router;
