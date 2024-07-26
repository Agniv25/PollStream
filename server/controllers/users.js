import Poll from "../models/poll.js";
import User from "../models/user.js";
export const getResources = (req, res) => {
  res.json({ message: "user has access" });
};
export const getDetails = async (req, res) => {
  const { username } = req.query;
  console.log("the usern ame is ");
  console.log(username);
  try {
    const user = await User.findOne({ username: username });
    return res.json(user);
  } catch (err) {
    res.json({ message: err.message });
  }
};
export const createPoll = async (req, res) => {
  const { username, question, options } = req.body;

  if (!username || !question || !options || !Array.isArray(options)) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    // Transform the array of option strings into an array of option objects
    const formattedOptions = options.map((optionText, index) => ({
      optionId: `${index + 1}`,
      text: optionText,
      votes: 0,
    }));

    // Create a new Poll object
    const poll = await Poll.create({
      question: question,
      options: formattedOptions,
      creator: username,
    });

    // Send the created poll as a response
    res.status(201).json(poll);
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
