import express from "express";
const router = express();
const { createData, login, logout } = require("./controller");
// router.get("/user", getAllData);
router.post("/register", createData);
router.post("/login", login);
router.post("/logout", logout);

export default router;
