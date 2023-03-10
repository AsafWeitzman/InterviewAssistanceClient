import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, IconButton, MenuItem, TextField } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import styled from "@emotion/styled";

import { BUTTONS_TEXT, GRID_SIZE, STEPS } from "../utils/constants";
import { calculateStatus } from "../utils/common";
import axios from "axios";
import { InterviewsContext } from "../context/InterviewsContext";

const CustomizedTextFieldDateTime = styled(TextField)({
  ".css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input::-webkit-calendar-picker-indicator":
    {
      filter: "invert(1)",
    },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "flex",
  bgcolor: "#272727",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const boxStyle = { m: "16px 8px 0 0" };

export default function EditRowModal({ interviewRow }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { listOfInterviews, setListOfInterviews } =
    useContext(InterviewsContext);

  const {
    id,
    companyName,
    jobTitle,
    step,
    dateAndTime,
    status,
    comment,
    whatWentWell,
    whatCanBeImproved,
    actionItems,
  } = interviewRow;

  const [stepValue, setStepValue] = useState(step);
  const [statusValue, setStatusValue] = useState(status);

  const updateInterviewList = (id, data) => {
    setListOfInterviews(
      listOfInterviews.map((interview) =>
        interview.id === id ? { ...interview, ...data } : interview
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      companyName: formData.get("companyName"),
      jobTitle: formData.get("jobTitle"),
      step: formData.get("step"),
      status: formData.get("status"),
      dateAndTime: formData.get("dateAndTime"),
      comment: formData.get("comment"),
      whatWentWell: formData.get("whatWentWell"),
      whatCanBeImproved: formData.get("whatCanBeImproved"),
      actionItems: formData.get("actionItems"),
    };

    axios
      .put(`http://localhost:3001/edit/${id}`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(
        (response) => {
          handleClose(!open);
          updateInterviewList(id, data);
        },
        (e) => {
          console.log("Oh no: " + e);
        }
      );
  };

  return (
    <div>
      <IconButton
        aria-label="edit row"
        size="small"
        onClick={() => {
          handleOpen(!open);
        }}
      >
        {open ? <ModeEditIcon /> : <ModeEditOutlineOutlinedIcon />}
      </IconButton>
      <Modal
        open={open}
        onClose={() => {
          handleClose(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit} sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              letterSpacing: ".2rem",
            }}
          >
            Edit Interview Process
          </Typography>

          <Grid container>
            <Grid
              item
              xs={GRID_SIZE.MEDIUM_LENGTH}
              sm={GRID_SIZE.MEDIUM_LENGTH}
              md={GRID_SIZE.MEDIUM_LENGTH}
              lg={GRID_SIZE.MEDIUM_LENGTH}
            >
              <Box sx={boxStyle}>
                <TextField
                  required
                  fullWidth
                  id="companyNameEdit"
                  label="Company Name"
                  name="companyName"
                  autoComplete="off"
                  inputProps={{ maxLength: 30 }}
                  defaultValue={companyName && companyName}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={GRID_SIZE.MEDIUM_LENGTH}
              sm={GRID_SIZE.MEDIUM_LENGTH}
              md={GRID_SIZE.MEDIUM_LENGTH}
              lg={GRID_SIZE.MEDIUM_LENGTH}
            >
              <Box sx={boxStyle}>
                <TextField
                  required
                  fullWidth
                  id="jobTitleEdit"
                  label="Job Title"
                  name="jobTitle"
                  autoComplete="off"
                  inputProps={{ maxLength: 30 }}
                  defaultValue={jobTitle && jobTitle}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={GRID_SIZE.SMALL_LENGTH}
              sm={GRID_SIZE.SMALL_LENGTH}
              md={GRID_SIZE.SMALL_LENGTH}
              lg={GRID_SIZE.SMALL_LENGTH}
            >
              <Box sx={boxStyle}>
                <TextField
                  fullWidth
                  required
                  select
                  value={stepValue && stepValue}
                  id="stepEdit"
                  label="Step"
                  name="step"
                  onChange={(e) => {
                    setStepValue(e.target.value);
                    const newStatus = calculateStatus(e.target.value);
                    setStatusValue(newStatus);
                  }}
                >
                  {Object.keys(STEPS).map((key, index) => (
                    <MenuItem key={index} value={STEPS[key]}>
                      {STEPS[key]}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
            <Grid
              item
              xs={GRID_SIZE.SMALL_LENGTH}
              sm={GRID_SIZE.SMALL_LENGTH}
              md={GRID_SIZE.SMALL_LENGTH}
              lg={GRID_SIZE.SMALL_LENGTH}
            >
              <Box sx={boxStyle}>
                <TextField
                  fullWidth
                  id="statusEdit"
                  label="Status"
                  name="status"
                  value={statusValue && statusValue}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={GRID_SIZE.MEDIUM_LENGTH}
              sm={GRID_SIZE.MEDIUM_LENGTH}
              md={GRID_SIZE.MEDIUM_LENGTH}
              lg={GRID_SIZE.MEDIUM_LENGTH}
            >
              <Box sx={boxStyle}>
                <CustomizedTextFieldDateTime
                  fullWidth
                  id="dateAndTimeEdit"
                  label="Date & Time"
                  name="dateAndTime"
                  type="datetime-local"
                  defaultValue={dateAndTime && dateAndTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={GRID_SIZE.LARGE_LENGTH}
              sm={GRID_SIZE.LARGE_LENGTH}
              md={GRID_SIZE.LARGE_LENGTH}
              lg={GRID_SIZE.LARGE_LENGTH}
            >
              <Box sx={boxStyle}>
                <TextField
                  fullWidth
                  id="commentEdit"
                  label="Comment"
                  name="comment"
                  autoComplete="off"
                  inputProps={{ maxLength: 100 }}
                  defaultValue={comment && comment}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={GRID_SIZE.LARGE_LENGTH}
              sm={GRID_SIZE.LARGE_LENGTH}
              md={GRID_SIZE.LARGE_LENGTH}
              lg={GRID_SIZE.LARGE_LENGTH}
            >
              <Box sx={boxStyle}>
                <TextField
                  fullWidth
                  id="whatWentWellEdit"
                  label="What Went Well?"
                  name="whatWentWell"
                  autoComplete="off"
                  inputProps={{ maxLength: 100 }}
                  defaultValue={whatWentWell && whatWentWell}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={GRID_SIZE.LARGE_LENGTH}
              sm={GRID_SIZE.LARGE_LENGTH}
              md={GRID_SIZE.LARGE_LENGTH}
              lg={GRID_SIZE.LARGE_LENGTH}
            >
              <Box sx={boxStyle}>
                <TextField
                  fullWidth
                  id="whatCanBeImprovedEdit"
                  label="What Can Be Improved?"
                  name="whatCanBeImproved"
                  inputProps={{ maxLength: 100 }}
                  autoComplete="off"
                  defaultValue={whatCanBeImproved && whatCanBeImproved}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={GRID_SIZE.LARGE_LENGTH}
              sm={GRID_SIZE.LARGE_LENGTH}
              md={GRID_SIZE.LARGE_LENGTH}
              lg={GRID_SIZE.LARGE_LENGTH}
            >
              <Box sx={boxStyle}>
                <TextField
                  fullWidth
                  id="actionItemsEdit"
                  label="Action Items"
                  name="actionItems"
                  autoComplete="off"
                  inputProps={{ maxLength: 100 }}
                  defaultValue={actionItems && actionItems}
                />
              </Box>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            sx={boxStyle}
            color="success"
            type="submit"
          >
            {BUTTONS_TEXT.SAVE}
          </Button>
          <Button
            variant="outlined"
            sx={{ m: "16px 8px 0 0" }}
            color="error"
            onClick={handleClose}
          >
            {BUTTONS_TEXT.EXIT}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
