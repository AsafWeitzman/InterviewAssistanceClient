import { Container, Grid, MenuItem, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import CustomizedButton from "./CustomizedButton";
import CustomizedTextField from "./CustomizedTextField";
import Pulse from "./Pulse";
import { STEPS } from "../utils/constants";
import { calculateStatus } from "../utils/common";

const AddInterview = ({ style }) => {
  const [showCard, setShowCard] = useState(false);
  const [companyNameValue, setCompanyNameValue] = useState("");
  const [jobTitleValue, setJobTitleValue] = useState("");
  const [stepValue, setStepValue] = useState("");
  const [dateAndTimeValue, setDateAndTimeValue] = useState("");

  //snackbar logic
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState(null);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const resetInputValues = () => {
    setCompanyNameValue("");
    setJobTitleValue("");
    setStepValue("");
    setDateAndTimeValue("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      companyName: formData.get("companyName"),
      jobTitle: formData.get("jobTitle"),
      step: formData.get("step"),
      dateAndTime: formData.get("dateAndTime"),
      status: calculateStatus(formData.get("step")),
    };

    console.log("data: ", data);

    axios
      .post("http://localhost:3001/", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(
        (response) => {
          console.log("response: ", response);
          resetInputValues();

          //snackbar logic
          setSnackbarContent("Your interview was saved!");
          setOpenSnackBar(true);
        },
        () => {
          //snackbar logic
          setSnackbarContent(
            "An unknown error accurred during interview save."
          );
          setOpenSnackBar(true);
        }
      );
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
          ...style,
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
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
            component="form"
            onSubmit={handleSubmit}
          >
            <Grid
              container
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
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
                    value={companyNameValue}
                    id="companyName"
                    label="Company Name"
                    name="companyName"
                    onChange={(e) => {
                      setCompanyNameValue(e.target.value);
                    }}
                  />
                </Box>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <Box sx={{ m: 1 }}>
                  <CustomizedTextField
                    required
                    fullWidth
                    value={jobTitleValue}
                    id="jobTitle"
                    label="Job Title"
                    name="jobTitle"
                    onChange={(e) => {
                      setJobTitleValue(e.target.value);
                    }}
                  />
                </Box>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <Box sx={{ m: 1 }}>
                  <CustomizedTextField
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: "black",
                      },
                    }}
                    filled
                    fullWidth
                    required
                    select
                    value={stepValue}
                    id="step"
                    label="Step"
                    name="step"
                    onChange={(e) => {
                      setStepValue(e.target.value);
                    }}
                  >
                    {Object.keys(STEPS).map((key, index) => (
                      <MenuItem key={index} value={STEPS[key]}>
                        {STEPS[key]}
                      </MenuItem>
                    ))}
                  </CustomizedTextField>
                </Box>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <Box sx={{ m: 1 }}>
                  <CustomizedTextField
                    required
                    fullWidth
                    value={dateAndTimeValue}
                    id="dateAndTime"
                    label="Date & Time"
                    name="dateAndTime"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      setDateAndTimeValue(e.target.value);
                    }}
                  />
                </Box>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item lg={6} md={6} sm={6} xs={6}></Grid>
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
                        resetInputValues();
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
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
          message={snackbarContent}
        />
      </Container>
    </>
  );
};
export default AddInterview;
