import express from "express";
import { getAllData, createData, updateData, deleteData } from "./controller";
// import from "../../utils/middleware";
const router = express();

router.get("/income", getAllData);
router.post("/income", createData);
router.put("/income/:id", updateData);
router.delete("/income/:id", deleteData);

export default router;
