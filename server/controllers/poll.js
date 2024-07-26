import Poll from "../models/poll.js";
import User from "../models/user.js";
import Vote from "../models/vote.js";
export const fetchPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.status(200).json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const setVotes = async (req, res) => {
  const { pollId, selectedOption, username } = req.body;
  const user = await User.findOne({ username: username });
  console.log("user Id is");
  const userId = user;
  // console.log("userId " + userId);
  if (!pollId || !selectedOption) {
    return res
      .status(400)
      .json({ message: "Poll ID and selected option are required" });
  }

  try {
    // Check if the user has already voted
    const existingVote = await Vote.findOne({ pollId, userId });
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

    n;
    option.votes += 1;
    await poll.save();

    // Record the vote
    const vote = new Vote({
      pollId,
      optionId: selectedOption,
      userId,
    });
    await vote.save();

    res.status(200).json({ message: "Vote cast successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const checkVote = async (req, res) => {
  const { pollId, username } = req.query;

  if (!pollId || !username) {
    return res
      .status(400)
      .json({ message: "Poll ID and username are required" });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has voted in the given poll
    const vote = await Vote.findOne({ pollId, userId: user._id });
    console.log("the vote is");
    console.log(vote);
    res.status(200).json({ hasVoted: !!vote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getResults = async (req, res) => {
  try {
    const { username } = req.query;
    const poll = await Poll.find({ creator: username });
    res.send(poll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
