import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResultCard from "./ResultCard";

export default function Results() {
  const { username } = useParams();
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/poll/getResults",
          {
            params: { username: username },
            withCredentials: true,
          }
        );
        setDetails(response.data);
      } catch (err) {
        alert(err.response.data.message);
      }
    };
    getResults();
  }, []);
  console.log(details);
  return (
    <>
      {details.map((details, index) => (
        <ResultCard
          key={index}
          options={details.options}
          question={details.question}
          _id={details._id}
          creator={details.creator}
        />
      ))}
    </>
  );
}
