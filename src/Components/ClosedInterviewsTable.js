import { Typography } from "@mui/material";

import { STATUSES } from "../utils/constants";
import InterviewsAccordion from "./InterviewsAccordion";

const ClosedInterviewsTable = () => {
  return (
    <>
      <Typography variant="h4" sx={{ m: "16px", textAlign: "center" }}>
        Closed Interviews
      </Typography>
      <InterviewsAccordion
        endedStatus={STATUSES.ENDED_BAD}
        style={{ margin: "0 5% 0 5%" }}
      />
    </>
  );
};
export default ClosedInterviewsTable;
