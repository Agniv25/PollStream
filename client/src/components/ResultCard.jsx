import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_API_URL}`);

export default function ResultCard({ _id, creator, question, options }) {
  const [pollOptions, setPollOptions] = useState(options);

  useEffect(() => {
    socket.on("pollUpdated", (updatedPoll) => {
      if (updatedPoll._id === _id) {
        setPollOptions(updatedPoll.options);
      }
    });

    return () => {
      socket.off("pollUpdated");
    };
  }, [_id]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <div className="text-gray-700 font-semibold mr-2">{creator}</div>
        <div className="text-gray-500 text-sm">created this poll</div>
      </div>
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <div className="space-y-2 mb-4">
        {pollOptions.map((option, index) => (
          <div key={index} className="flex items-center">
            <span className="text-gray-700 mr-2">{option.text}</span>
            <span className="text-gray-500">{option.votes} votes</span>
          </div>
        ))}
      </div>
    </div>
  );
}
