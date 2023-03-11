import { Typography } from "@mui/material";

import { divStyleBackgroundImageHexagon } from "../style/backgroundImageDivStyle";
import { FONT_FAMILY, FONT_WEIGHT } from "../style/textStyle";
import { INTERVIEWS_CATEGORY, STATUSES } from "../utils/constants";
import InterviewsAccordion from "./InterviewsAccordion";

const ClosedInterviewsTable = () => {
  return (
    <div style={divStyleBackgroundImageHexagon}>
      <Typography
        variant="h4"
        sx={{
          m: "16px",
          textAlign: "center",
          fontFamily: FONT_FAMILY.MONOSPACE,
          fontWeight: FONT_WEIGHT.MEDIUM,
        }}
      >
        {INTERVIEWS_CATEGORY.CLOSED_INTERVIEWS}
      </Typography>
      <InterviewsAccordion
        endedStatus={STATUSES.ENDED_BAD}
        style={{ margin: "0 5% 0 5%" }}
      />
    </div>
  );
};
export default ClosedInterviewsTable;
