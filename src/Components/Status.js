import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { STEPS } from "../utils/constants";
import { COLORS } from "../style/colors";

const textBackgroundStyle = {
  display: "inline-flex",
  padding: "4px 8px 4px 8px",
  borderRadius: "16px",
  color: "black",
};

const AppliedBox = () => {
  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          backgroundColor: COLORS.PALE_CORNFLOWER_BLUE,
          ...textBackgroundStyle,
        }}
      >
        Applied
      </Typography>
    </Box>
  );
};

const InProgressBox = () => {
  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          backgroundColor: COLORS.ROMANTIC_ORANGE,
          ...textBackgroundStyle,
        }}
      >
        In progress
      </Typography>
    </Box>
  );
};

const OfferBox = () => {
  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          backgroundColor: COLORS.MINT,
          ...textBackgroundStyle,
        }}
      >
        Offer
      </Typography>
    </Box>
  );
};

const EndedBox = () => {
  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          backgroundColor: COLORS.PINK_SHERBERT,
          ...textBackgroundStyle,
        }}
      >
        Ended
      </Typography>
    </Box>
  );
};

const Status = ({ step }) => {
  switch (step) {
    case STEPS.RESUME_SCREEN:
      return <AppliedBox />;
    case STEPS.RECRUITER_CALL:
      return <InProgressBox />;
    case STEPS.RECOMMENDATIONS:
      return <InProgressBox />;
    case STEPS.ONSITE_INTERVIEWS:
      return <InProgressBox />;
    case STEPS.HR_INTERVIEWS:
      return <InProgressBox />;
    case STEPS.PHONE_SCREEN:
      return <InProgressBox />;
    case STEPS.SALARY_NEGOTIATION:
      return <InProgressBox />;
    case STEPS.OFFER:
      return <OfferBox />;
    case STEPS.ENDED:
      return <EndedBox />;
  }
};
export default Status;
