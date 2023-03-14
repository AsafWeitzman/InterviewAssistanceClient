import { Container, Grid, MenuItem, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import CustomizedButton from "./CustomizedButton";
import CustomizedTextField from "./CustomizedTextField";
import Pulse from "./Pulse";
import {
  BUTTONS_TEXT,
  GRID_SIZE,
  SNACKBAR_MSG,
  STEPS,
} from "../utils/constants";
import { calculateStatus } from "../utils/common";
import { InterviewsContext } from "../context/InterviewsContext";

const AddInterview = ({ style }) => {
  const [showCard, setShowCard] = useState(false);
  const [companyNameValue, setCompanyNameValue] = useState("");
  const [jobTitleValue, setJobTitleValue] = useState("");
  const [stepValue, setStepValue] = useState("");
  const [dateAndTimeValue, setDateAndTimeValue] = useState("");
  const { fetchDataToggle, setFetchDataToggle } = useContext(InterviewsContext);

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
    axios
      .post("http://localhost:3001/", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(
        (response) => {
          resetInputValues();

          //snackbar logic
          setSnackbarContent(SNACKBAR_MSG.YOUR_INTERVIEW_WAS_SAVED);
          setOpenSnackBar(true);
          setFetchDataToggle(!fetchDataToggle);
        },
        () => {
          //snackbar logic
          setSnackbarContent(SNACKBAR_MSG.ERR_DURING_INTERVIEW_SAVE);
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
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileTap={{ scale: 0.9 }}
              fullWidth
              variant="contained"
              onClick={handleAddInterviewButton}
            >
              {BUTTONS_TEXT.ADD_AN_INTERVIEW}
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
              <Grid
                item
                lg={GRID_SIZE.SMALL_LENGTH}
                md={GRID_SIZE.SMALL_LENGTH}
                sm={GRID_SIZE.SMALL_LENGTH}
                xs={GRID_SIZE.SMALL_LENGTH}
              >
                <Box sx={{ m: 1 }}>
                  <CustomizedTextField
                    required
                    fullWidth
                    value={companyNameValue}
                    id="companyName"
                    label="Company Name"
                    name="companyName"
                    autoComplete="off"
                    inputProps={{ maxLength: 30 }}
                    onChange={(e) => {
                      setCompanyNameValue(e.target.value);
                    }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                lg={GRID_SIZE.SMALL_LENGTH}
                md={GRID_SIZE.SMALL_LENGTH}
                sm={GRID_SIZE.SMALL_LENGTH}
                xs={GRID_SIZE.SMALL_LENGTH}
              >
                <Box sx={{ m: 1 }}>
                  <CustomizedTextField
                    required
                    fullWidth
                    value={jobTitleValue}
                    id="jobTitle"
                    label="Job Title"
                    name="jobTitle"
                    autoComplete="off"
                    inputProps={{ maxLength: 30 }}
                    onChange={(e) => {
                      setJobTitleValue(e.target.value);
                    }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                lg={GRID_SIZE.SMALL_LENGTH}
                md={GRID_SIZE.SMALL_LENGTH}
                sm={GRID_SIZE.SMALL_LENGTH}
                xs={GRID_SIZE.SMALL_LENGTH}
              >
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
              <Grid
                item
                lg={GRID_SIZE.SMALL_LENGTH}
                md={GRID_SIZE.SMALL_LENGTH}
                sm={GRID_SIZE.SMALL_LENGTH}
                xs={GRID_SIZE.SMALL_LENGTH}
              >
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
                <Grid
                  item
                  lg={GRID_SIZE.MEDIUM_LENGTH}
                  md={GRID_SIZE.MEDIUM_LENGTH}
                  sm={GRID_SIZE.MEDIUM_LENGTH}
                  xs={GRID_SIZE.MEDIUM_LENGTH}
                ></Grid>
                <Grid
                  item
                  lg={GRID_SIZE.SMALL_LENGTH}
                  md={GRID_SIZE.SMALL_LENGTH}
                  sm={GRID_SIZE.SMALL_LENGTH}
                  xs={GRID_SIZE.SMALL_LENGTH}
                >
                  <Box sx={{ m: 1 }}>
                    <CustomizedButton
                      fullWidth
                      variant="contained"
                      type="submit"
                    >
                      {BUTTONS_TEXT.ADD}
                    </CustomizedButton>
                  </Box>
                </Grid>
                <Grid
                  item
                  lg={GRID_SIZE.SMALL_LENGTH}
                  md={GRID_SIZE.SMALL_LENGTH}
                  sm={GRID_SIZE.SMALL_LENGTH}
                  xs={GRID_SIZE.SMALL_LENGTH}
                >
                  <Box sx={{ m: 1 }}>
                    <CustomizedButton
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        resetInputValues();
                        setShowCard(false);
                      }}
                    >
                      {BUTTONS_TEXT.CANCEL}
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
