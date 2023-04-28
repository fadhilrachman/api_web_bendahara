import express from "express";
import { getAllData, createData, updateData } from "./controller";
const router = express();

router.get("/pemasukan", getAllData);
router.post("/pemasukan", createData);
router.put("/pemasukan/:id", updateData);

export default router;
