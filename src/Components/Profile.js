import React, { useContext, useState } from "react";
import { Typography, Tabs, Tab } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import { AuthContext } from "../context/AuthContext";
import { TABS } from "../utils/constants";
import Statistics from "./Statistics";
import Settings from "./Settings";
import InterviewsSchedule from "./InterviewsSchedule";
import { FONT_FAMILY, FONT_WEIGHT } from "../style/textStyle";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: "8px" }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const boxWrapper = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const child = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Profile = () => {
  const { authState } = useContext(AuthContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            m: "16px 0 8px 0",
            textAlign: "center",
            fontFamily: FONT_FAMILY.MONOSPACE,
            fontWeight: FONT_WEIGHT.MEDIUM,
          }}
        >
          Hi {authState.userName}
        </Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{
            borderRight: 1,
            borderColor: "divider",
          }}
        >
          <Tab label={TABS.STATISTICS} {...a11yProps(0)} />
          <Tab label={TABS.INTERVIEWS_SCHEDULE} {...a11yProps(1)} />
          <Tab label={TABS.SETTINGS} {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0} style={{ width: "70%" }}>
          <Box
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={boxWrapper}
          >
            <Statistics component={motion.div} variants={child} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} style={{ width: "80%" }}>
          <Box
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={boxWrapper}
          >
            <InterviewsSchedule component={motion.div} variants={child} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2} style={{ width: "70%" }}>
          <Box
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={boxWrapper}
          >
            <Settings component={motion.div} variants={child} />
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};
export default Profile;
