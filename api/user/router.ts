import express from "express";
const router = express();
const { getAllData, createData } = require("./controller");

router.get("/user", getAllData);
router.post("/user", createData);

export default router;
