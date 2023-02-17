import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import { STATUSES } from "../utils/constants";
import InterviewsAccordion from "./InterviewsAccordion";

const SuccessfulInterviewsTable = () => {
  const [listOfInterviews, setListOfInterviews] = useState([]);

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

          setListOfInterviews(
            interviews.filter((interview) => {
              return interview.status === STATUSES.ENDED_GOOD;
            })
          );
        }
      });
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ m: "16px", textAlign: "center" }}>
        Successful Interviews Table
      </Typography>
      <InterviewsAccordion
        listOfInterviews={listOfInterviews}
        style={{ margin: "0 5% 0 5%" }}
      />
    </>
  );
};
export default SuccessfulInterviewsTable;
