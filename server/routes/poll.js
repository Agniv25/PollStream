import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  checkVote,
  fetchPolls,
  setVotes,
  getResults,
} from "../controllers/poll.js";
const router = express.Router();
router.get("/fetchPolls", verifyToken, fetchPolls);
// router.post("/vote", verifyToken, setVotes);
router.get("/checkVote", verifyToken, checkVote);
router.get("/getResults", verifyToken, getResults);
export default router;
