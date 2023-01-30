import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";

const CustomizedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey["A700"]),
  backgroundColor: grey[600],
  "&:hover": {
    backgroundColor: grey[800],
  },
}));

export default CustomizedButton;
