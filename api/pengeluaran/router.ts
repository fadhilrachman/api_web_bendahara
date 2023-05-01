import express from "express";
import { getAllData, createData, updateData, deleteData } from "./controller";
import verifyToken from "../../utils/middleware";
const router = express();

router.get("/pengeluaran", getAllData);
router.post("/pengeluaran", createData);
router.put("/pengeluaran/:id", verifyToken, updateData);
router.delete("/pengeluaran/:id", verifyToken, deleteData);

export default router;
