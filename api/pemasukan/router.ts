import express from "express";
import { getAllData, createData, updateData, deleteData } from "./controller";
import verifyToken from "../../utils/middleware";
const router = express();

router.get("/pemasukan", verifyToken, getAllData);
router.post("/pemasukan", verifyToken, createData);
router.put("/pemasukan/:id", verifyToken, updateData);
router.delete("/pemasukan/:id", verifyToken, deleteData);
export default router;
