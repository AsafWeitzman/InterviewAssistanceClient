import { Typography } from "@mui/material";
import { divStyleBackgroundImageHexagon } from "../style/backgroundImageDivStyle";

import { STATUSES } from "../utils/constants";
import InterviewsAccordion from "./InterviewsAccordion";

const ClosedInterviewsTable = () => {
  return (
    <div style={divStyleBackgroundImageHexagon}>
      <Typography
        variant="h4"
        sx={{
          m: "16px",
          textAlign: "center",
          fontFamily: "monospace",
          fontWeight: 600,
        }}
      >
        Closed Interviews
      </Typography>
      <InterviewsAccordion
        endedStatus={STATUSES.ENDED_BAD}
        style={{ margin: "0 5% 0 5%" }}
      />
    </div>
  );
};
export default ClosedInterviewsTable;
