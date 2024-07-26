import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll", // Reference to the Poll model
  },
  optionId: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
