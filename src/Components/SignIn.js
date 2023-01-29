import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

import { ReactComponent as InterviewManagerLogoAW } from "../assets/svg/InterviewManagerLogoAW.svg";

const SignIn = () => {
  return (
    <Container
      fixed
      maxWidth="xxl"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        p: "10% 2% 0 0%",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
        }}
      >
        <InterviewManagerLogoAW
          style={{ display: { xs: "none", md: "flex" }, margin: "0 0 8px 0" }}
        />
        <div
          style={{
            background: "rgba(255,255,255,0.5)",
            borderRadius: "16px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              m: 2,
              display: { xs: "none", md: "flex" },
              width: "55ch",
              letterSpacing: ".3rem",
              color: "black",
            }}
          >
            Empower your job search with our user-friendly application that
            streamlines and simplifies the interview process, helping you to
            confidently manage and track your progress every step of the way.
          </Typography>
        </div>
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <h1>form</h1>
      </Box>

      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          alignItems: "center",
          p: "10% 2% 0 2%",
        }}
      >
        <InterviewManagerLogoAW
          style={{ display: { xs: "flex", md: "none" }, margin: "0 0 8px 0" }}
        />
        <div
          style={{
            background: "rgba(255,255,255,0.5)",
            borderRadius: "16px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              textAlign: "center",
              display: { xs: "flex", md: "none" },
              letterSpacing: ".3rem",
              color: "black",
            }}
          >
            Empower your job search with our user-friendly application.
          </Typography>
        </div>
        <h1>form</h1>
      </Box>
    </Container>
  );
};
export default SignIn;
