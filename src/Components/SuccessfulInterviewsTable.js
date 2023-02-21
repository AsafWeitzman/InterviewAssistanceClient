import { Typography } from "@mui/material";
import { divStyleBackgroundImageHexagon } from "../style/backgroundImageDivStyle";

import { STATUSES } from "../utils/constants";
import InterviewsAccordion from "./InterviewsAccordion";

const SuccessfulInterviewsTable = () => {
  return (
    <div style={divStyleBackgroundImageHexagon}>
      <Typography variant="h4" sx={{ m: "16px", textAlign: "center" }}>
        Successful Interviews
      </Typography>
      <InterviewsAccordion
        endedStatus={STATUSES.ENDED_GOOD}
        style={{ margin: "0 5% 5% 5%", overflow: "auto", maxHeight: "100vh" }}
      />
    </div>
  );
};
export default SuccessfulInterviewsTable;
