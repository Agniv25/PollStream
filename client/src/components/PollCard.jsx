import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function PollCard({ _id, creator, question, options }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [isVoted, setIsVoted] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    const checkIfVoted = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/poll/checkVote",
          {
            params: { pollId: _id, username: username },
            withCredentials: true,
          }
        );
        setIsVoted(response.data.hasVoted);
      } catch (error) {
        console.error("Error checking vote status", error);
      }
    };

    checkIfVoted();
  }, [_id, username]);

  const handleVote = async () => {
    if (isVoted) {
      alert("You have already voted on this poll.");
      return;
    }

    if (!selectedOption) {
      alert("Please select an option to vote.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/poll/vote",
        { pollId: _id, selectedOption, username: username },
        { withCredentials: true }
      );
      setIsVoted(true);
      alert("Vote cast successfully!");
    } catch (error) {
      console.error("Error casting vote", error);
      alert("Error casting vote");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <div className="text-gray-700 font-semibold mr-2">{creator}</div>
        <div className="text-gray-500 text-sm">created this poll</div>
      </div>
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <div className="space-y-2 mb-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`option-${index}`}
              name="pollOption"
              value={option.optionId}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mr-2"
              disabled={isVoted} // Disable radio buttons if already voted
            />
            <label htmlFor={`option-${index}`} className="text-gray-700">
              {option.text}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleVote}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          isVoted ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isVoted} // Disable button if already voted
      >
        Vote
      </button>
    </div>
  );
}
