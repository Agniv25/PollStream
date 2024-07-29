import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  checkVote,
  fetchPolls,
  setVotes,
  getResults,
} from "../controllers/poll.js";
const router = express.Router();
router.get("/fetchPolls", fetchPolls);
// router.post("/vote", verifyToken, setVotes);
router.get("/checkVote", checkVote);
router.get("/getResults", getResults);
export default router;
