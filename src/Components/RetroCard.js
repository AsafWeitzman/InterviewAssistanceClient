import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

import { ReactComponent as CommentIcon } from "../assets/svg/CommentIcon.svg";
import { ReactComponent as WhatWentWellIcon } from "../assets/svg/WhatWentWellIcon.svg";
import { ReactComponent as WhatCanBeImprovedIcon } from "../assets/svg/WhatCanBeImprovedIcon.svg";
import { ReactComponent as ActionItemsIcon } from "../assets/svg/ActionItemsIcon.svg";

import { RETRO_TITLES } from "../utils/constants";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "rgba(255,255,255,0.6)",
  borderRadius: "8px 40px",
  p: 1,
  mt: 2,
  mb: 2,
  boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  minHeight: "330px",
  transition: "width 2s, height 4s",
};

const containerStyle = {
  backgroundImage: `linear-gradient(to bottom, #474554, #ACA9BB)`,
  padding: "4px 0 4px 0",
  borderRadius: "16px",
};

const iconStyle = {
  display: { xs: "none", md: "flex" },
  padding: "16px 0px 24px 0px",
  width: "80%",
  height: "80%",
};

const IconMotion = ({ children }) => {
  return (
    <motion.div
      style={{ display: "flex", justifyContent: "center" }}
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};

const RetroIcon = ({ retroTitle, style }) => {
  switch (retroTitle) {
    case RETRO_TITLES.COMMENT:
      return (
        <IconMotion>
          <CommentIcon style={{ ...style }} />
        </IconMotion>
      );
    case RETRO_TITLES.WHAT_WENT_WELL:
      return (
        <IconMotion>
          <WhatWentWellIcon style={{ ...style }} />
        </IconMotion>
      );
    case RETRO_TITLES.WHAT_CAN_BE_IMPROVED:
      return (
        <IconMotion>
          <WhatCanBeImprovedIcon style={{ ...style }} />
        </IconMotion>
      );
    case RETRO_TITLES.ACTION_ITEMS:
      return (
        <IconMotion>
          <ActionItemsIcon style={{ ...style }} />
        </IconMotion>
      );
  }
};

export default function RetroCard({ retroTitle, content }) {
  return (
    <Container sx={containerStyle}>
      <Box
        sx={boxStyle}
        component={motion.div}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
      >
        <RetroIcon retroTitle={retroTitle} style={iconStyle} />

        <Typography
          variant="h5"
          sx={{ color: "black", m: "16px 8px 8px 8px", textAlign: "center" }}
        >
          {retroTitle}
        </Typography>

        <Typography
          paragraph
          sx={{ color: "black", m: "0px 8px 8px 8px", textAlign: "center" }}
        >
          {content ? content : "-"}
        </Typography>
      </Box>
    </Container>
  );
}
