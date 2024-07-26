import express from "express";
import { register, login, verify } from "../controllers/auth.js";

const router = express.Router();
// router.get("/register", register);
router.post("/register", register);
router.post("/login", login);
router.post("/captchaVerify", verify);

export default router;
