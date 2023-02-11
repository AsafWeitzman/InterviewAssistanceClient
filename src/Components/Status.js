import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { motion } from "framer-motion";

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
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
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
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
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
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
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
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
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
