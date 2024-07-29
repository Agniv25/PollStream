import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreatePoll from "./CreatePoll";
import ViewPolls from "./ViewPolls";
import Results from "./Results";

const Home = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [activeComponent, setActiveComponent] = useState("CreatePoll");

  useEffect(() => {
    console.log("The username is " + username);
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "${process.env.URL}/users/getDetails",
          {
            params: { username: username },
            withCredentials: true,
          }
        );
        setUser(response.data);
      } catch (error) {
        alert(error.response.data.message);
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, [username]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case "CreatePoll":
        return <CreatePoll />;
      case "ViewPolls":
        return <ViewPolls />;
      case "Results":
        return <Results />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {console.log(user)}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Welcome, {user.username}!
      </h1>
      <div className="mb-6 space-x-4">
        <button
          onClick={() => setActiveComponent("CreatePoll")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Poll
        </button>
        <button
          onClick={() => setActiveComponent("ViewPolls")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          View Polls
        </button>
        <button
          onClick={() => setActiveComponent("Results")}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Results
        </button>
      </div>
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Home;
