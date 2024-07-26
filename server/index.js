import express from "express";
import env from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http"; // Import http module
import { Server as SocketIOServer } from "socket.io"; // Import socket.io

import { connectToDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import pollRoutes from "./routes/poll.js";
// import Poll from 'models/Poll.js';
import User from "./models/user.js";
import Vote from "./models/vote.js";
import Poll from "./models/poll.js";

env.config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173", // Allow your frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/poll", pollRoutes);

connectToDB();

const PORT = 3000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Route to handle voting
app.post("/poll/vote", async (req, res) => {
  const { pollId, selectedOption, username } = req.body;
  const user = await User.findOne({ username });

  if (!pollId || !selectedOption) {
    return res
      .status(400)
      .json({ message: "Poll ID and selected option are required" });
  }

  try {
    // Check if the user has already voted
    const existingVote = await Vote.findOne({ pollId, userId: user._id });
    if (existingVote) {
      return res
        .status(400)
        .json({ message: "User has already voted on this poll" });
    }

    // Find the poll
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    // Find the option and increment votes
    const option = poll.options.find((opt) => opt.optionId === selectedOption);
    if (!option) {
      return res.status(404).json({ message: "Option not found" });
    }

    // Increment the vote count for the selected option
    option.votes += 1;
    await poll.save();

    // Record the vote
    const vote = new Vote({
      pollId,
      optionId: selectedOption,
      userId: user._id,
    });
    await vote.save();

    // Emit the updated poll data to connected clients
    io.emit("pollUpdated", poll);

    res.status(200).json({ message: "Vote cast successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
