import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const InterviewsContext = createContext("");

export function InterviewsContextProvider({ children }) {
  const [listOfInterviews, setListOfInterviews] = useState([]);
  const [fetchDataToggle, setFetchDataToggle] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/interviews", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log("interviewTable response: ", response.data.error);
        } else {
          const interviews = response.data;
          setListOfInterviews(interviews);
        }
      });
  }, [fetchDataToggle]);

  console.log("InterviewsContext- listOfInterviews: ", listOfInterviews);

  return (
    <InterviewsContext.Provider
      value={{
        listOfInterviews,
        setListOfInterviews,
        fetchDataToggle,
        setFetchDataToggle,
      }}
    >
      {children}
    </InterviewsContext.Provider>
  );
}
