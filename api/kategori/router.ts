import express from "express";
import { getAllData, createData, deleteData, updateData } from "./controller";
const router = express();

router.get("/categories", getAllData);
router.post("/categories", createData);
router.put("/categories/:id", updateData);
router.delete("/categories/:id", deleteData);

export default router;
