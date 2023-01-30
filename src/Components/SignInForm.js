import { Grid, Link } from "@mui/material";
import { Box } from "@mui/system";

import CustomizedButton from "./CustomizedButton";
import CustomizedTextField from "./CustomizedTextField";

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
      <CustomizedTextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        // autoComplete="email"
        autoFocus
      />
      <CustomizedTextField
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
