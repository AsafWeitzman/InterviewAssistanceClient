import { Typography } from "@mui/material";

import { STATUSES } from "../utils/constants";
import InterviewsAccordion from "./InterviewsAccordion";

const SuccessfulInterviewsTable = () => {
  return (
    <>
      <Typography variant="h4" sx={{ m: "16px", textAlign: "center" }}>
        Successful Interviews
      </Typography>
      <InterviewsAccordion
        endedStatus={STATUSES.ENDED_GOOD}
        style={{ margin: "0 5% 0 5%" }}
      />
    </>
  );
};
export default SuccessfulInterviewsTable;
