import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
  question: String,
  options: [
    {
      optionId: String,
      text: String,
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
  creator: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Poll = mongoose.model("Poll", pollSchema);

export default Poll;
