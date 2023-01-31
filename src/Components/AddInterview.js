import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

import CustomizedButton from "./CustomizedButton";
import CustomizedTextField from "./CustomizedTextField";
import LinearWithValueLabel from "./LinearWithValueLabel";
import Pulse from "./Pulse";

const InterviewCard = () => {
  const [showCard, setShowCard] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("test", {
      companyName: data.get("companyName"),
      jobTitle: data.get("jobTitle"),
      step: data.get("step"),
      dateAndTime: data.get("dateAndTime"),
    });
  };

  const handleAddInterviewButton = () => {
    setShowCard(!showCard);
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: "15% 0 0 0",
        }}
      >
        <Box>
          <Pulse shouldPules={!showCard}>
            <CustomizedButton
              fullWidth
              variant="contained"
              onClick={handleAddInterviewButton}
            >
              Add an Interview
            </CustomizedButton>
          </Pulse>
        </Box>
        {showCard && (
          <Box
            sx={{
              flexGrow: 1,
              background: "rgba(255,255,255,0.8)",
              borderRadius: "16px",
              p: 1,
              m: 2,
            }}
            component="form"
            onSubmit={handleSubmit}
          >
            <Grid container>
              <Grid item xs={12}>
                <Box sx={{ m: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      letterSpacing: ".2rem",
                      color: "black",
                    }}
                  >
                    Interview Details
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <Box sx={{ m: 1 }}>
                  <CustomizedTextField
                    required
                    fullWidth
                    id="companyName"
                    label="Company Name"
                    name="companyName"
                  />
                </Box>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <Box sx={{ m: 1 }}>
                  <CustomizedTextField
                    required
                    fullWidth
                    id="jobTitle"
                    label="Job Title"
                    name="jobTitle"
                  />
                </Box>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <Box sx={{ m: 1 }}>
                  <CustomizedTextField
                    required
                    fullWidth
                    id="step"
                    label="Step"
                    name="step"
                  />
                </Box>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <Box sx={{ m: 1 }}>
                  <CustomizedTextField
                    required
                    fullWidth
                    id="dateAndTime"
                    label="Date & Time"
                    name="dateAndTime"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Box sx={{ m: 1 }}>{/* <LinearWithValueLabel /> */}</Box>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={3}>
                  <Box sx={{ m: 1 }}>
                    <CustomizedButton
                      fullWidth
                      variant="contained"
                      type="submit"
                    >
                      Add
                    </CustomizedButton>
                  </Box>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={3}>
                  <Box sx={{ m: 1 }}>
                    <CustomizedButton
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        setShowCard(false);
                      }}
                    >
                      Cancel
                    </CustomizedButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
};
export default InterviewCard;
