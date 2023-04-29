import express from "express";
const router = express();
const { getAllData, createData, login } = require("./controller");

router.get("/user", getAllData);
router.post("/user", createData);
router.post("/login", login);

export default router;
