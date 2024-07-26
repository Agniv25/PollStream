import axios from "axios";
import { useEffect, useState } from "react";
import PollCard from "./PollCard";

export default function ViewPolls() {
  const [polls, setPolls] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        "http://localhost:3000/poll/fetchPolls",
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setPolls(response.data);
    };
    fetchPosts();
  }, []);
  return (
    <>
      {polls.map((poll, index) => (
        <PollCard
          key={index}
          _id={poll._id}
          creator={poll.creator}
          question={poll.question}
          options={poll.options}
        />
      ))}
    </>
  );
}
