import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getDetails } from "../controllers/users.js";
import { createPoll } from "../controllers/users.js";

const router = express.Router();
// router.get("/getResources", verifyToken, getResources);
router.get("/getDetails", getDetails);
router.post("/createPoll", createPoll);
export default router;
