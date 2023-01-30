import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const CustomizedTextField = styled(TextField)({
  ".css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill": {
    "-webkit-box-shadow": "0 0 0 0 inset",
    "-webkit-text-fill-color": "black",
    caretColor: "#fff",
    borderRadius: "inherit",
  },
  ".MuiFormLabel-root": {
    color: "black",
  },
  ".MuiInputBase-input": {
    color: "black",
  },
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "grey",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});

export default CustomizedTextField;
