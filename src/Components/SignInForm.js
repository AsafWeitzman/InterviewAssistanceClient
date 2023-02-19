import { Container, Grid, Link } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useContext, useState } from "react";

import CustomizedButton from "./CustomizedButton";
import CustomizedTextField from "./CustomizedTextField";
import SignUpModal from "./SignUpModal";
import { AuthContext } from "../context/AuthContext";
import { InterviewsContext } from "../context/InterviewsContext";

const SignInForm = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  const { fetchDataToggle, setFetchDataToggle } = useContext(InterviewsContext);

  const resetValues = () => {
    setEmailValue("");
    setPasswordValue("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axios
      .post("http://localhost:3001/auth/login", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(
        (response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            localStorage.setItem("accessToken", response.data.token);
            setAuthState({
              userName: response.data.userName,
              id: response.data.id,
              email: response.data.email,
              status: true,
            });
            setFetchDataToggle(!fetchDataToggle);
          }
          resetValues();
        },
        (e) => {
          console.log("Oh no: ", e);
        }
      );
  };

  return (
    <>
      <Container
        sx={{
          mt: 2,
          background: "rgba(255,255,255,0.8)",
          borderRadius: "16px",
          p: 2,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <CustomizedTextField
            margin="normal"
            required
            fullWidth
            value={emailValue}
            id="email"
            label="Email Address"
            name="email"
            select={false}
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
          />
          <CustomizedTextField
            margin="normal"
            required
            fullWidth
            value={passwordValue}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
          />
          <CustomizedButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign In
          </CustomizedButton>
        </Box>
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
            <SignUpModal />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SignInForm;
