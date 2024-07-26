import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CreatePoll() {
  const { username } = useParams();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const addOptions = (e) => {
    e.preventDefault();
    setOptions((options) => [...options, ""]);
  };
  const submitPoll = async (e) => {
    e.preventDefault();
    console.log(options);
    try {
      const response = await axios.post(
        "http://localhost:3000/users/createPoll",
        {
          username: username,
          question: question,
          options: options,
        },
        { withCredentials: true }
      );
      // alert(response.data);
      alert("Poll has been posted");
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Poll</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="question"
            >
              Question
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your question"
            />
          </div>
          {options.map((option, index) => (
            <div key={index} className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`option-${index}`}
              >
                Option {index + 1}
              </label>
              <input
                type="text"
                id={`option-${index}`}
                value={option}
                onChange={(e) => handleOptionChange(e, index)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Add Option"
              />
            </div>
          ))}
          <button
            onClick={addOptions}
            className=" mb-2 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Options
          </button>

          <button
            onClick={submitPoll}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
}
