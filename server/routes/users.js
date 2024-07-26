import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getDetails } from "../controllers/users.js";
import { createPoll } from "../controllers/users.js";

const router = express.Router();
// router.get("/getResources", verifyToken, getResources);
router.get("/getDetails", verifyToken, getDetails);
router.post("/createPoll", verifyToken, createPoll);
export default router;
