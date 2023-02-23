import { Typography } from "@mui/material";
import { TABS } from "../utils/constants";

const Settings = () => {
  return (
    <Typography
      variant="h4"
      sx={{
        m: "0 0 0 8px",
      }}
    >
      {TABS.SETTINGS}
    </Typography>
  );
};
export default Settings;
