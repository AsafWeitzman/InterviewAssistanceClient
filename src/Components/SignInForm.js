import { Grid, TextField, Button, Link } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";

const CustomizedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey["A700"]),
  backgroundColor: grey[600],
  "&:hover": {
    backgroundColor: grey[800],
  },
}));

const CssTextField = styled(TextField)({
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

const SignInForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        mt: 2,
        background: "rgba(255,255,255,0.6)",
        borderRadius: "16px",
        p: 2,
      }}
    >
      <CssTextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <CssTextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <CustomizedButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
      >
        Sign In
      </CustomizedButton>
      <Grid container>
        <Grid item xs>
          <Link
            href="#"
            variant="body2"
            sx={{ color: "black", fontWeight: 900 }}
          >
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="#"
            variant="body2"
            sx={{ color: "black", fontWeight: 900 }}
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInForm;
