import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdPolls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll", // Reference to the Poll model
    },
  ],
  votedPolls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
