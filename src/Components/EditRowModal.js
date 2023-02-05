import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, IconButton, TextField } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CustomizedTextField from "./CustomizedTextField";
import styled from "@emotion/styled";

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

const GRID_SIZE_3 = 3;
const GRID_SIZE_6 = 6;
const GRID_SIZE_12 = 12;

export default function EditRowModal({ interviewRow }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      companyName: data.get("companyName"),
      jobTitle: data.get("jobTitle"),
    });
    setTimeout(() => {
      handleClose(!open);
      console.log("row updated");
    }, 1000);
  };

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
              xs={GRID_SIZE_6}
              sm={GRID_SIZE_6}
              md={GRID_SIZE_6}
              lg={GRID_SIZE_6}
            >
              <Box sx={boxStyle}>
                <TextField
                  required
                  fullWidth
                  id="companyNameEdit"
                  label="Company Name"
                  name="companyName"
                  defaultValue={companyName && companyName}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={GRID_SIZE_6}
              sm={GRID_SIZE_6}
              md={GRID_SIZE_6}
              lg={GRID_SIZE_6}
            >
              <Box sx={boxStyle}>
                <TextField
                  required
                  fullWidth
                  id="jobTitleEdit"
                  label="Job Title"
                  name="jobTitle"
                  defaultValue={jobTitle && jobTitle}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={GRID_SIZE_3}
              sm={GRID_SIZE_3}
              md={GRID_SIZE_3}
              lg={GRID_SIZE_3}
            >
              <Box sx={boxStyle}>
                <TextField
                  fullWidth
                  id="stepEdit"
                  label="Step"
                  name="step"
                  defaultValue={step && step}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={GRID_SIZE_3}
              sm={GRID_SIZE_3}
              md={GRID_SIZE_3}
              lg={GRID_SIZE_3}
            >
              <Box sx={boxStyle}>
                <TextField
                  fullWidth
                  id="statusEdit"
                  label="Status"
                  name="status"
                  defaultValue={status && status}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={GRID_SIZE_6}
              sm={GRID_SIZE_6}
              md={GRID_SIZE_6}
              lg={GRID_SIZE_6}
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
              xs={GRID_SIZE_12}
              sm={GRID_SIZE_12}
              md={GRID_SIZE_12}
              lg={GRID_SIZE_12}
            >
              <Box sx={boxStyle}>
                <TextField
                  fullWidth
                  id="commentEdit"
                  label="Comment"
                  name="comment"
                  defaultValue={comment && comment}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={GRID_SIZE_12}
              sm={GRID_SIZE_12}
              md={GRID_SIZE_12}
              lg={GRID_SIZE_12}
            >
              <Box sx={boxStyle}>
                <TextField
                  fullWidth
                  id="whatWentWellEdit"
                  label="What Went Well?"
                  name="whatWentWell"
                  defaultValue={whatWentWell && whatWentWell}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={GRID_SIZE_12}
              sm={GRID_SIZE_12}
              md={GRID_SIZE_12}
              lg={GRID_SIZE_12}
            >
              <Box sx={boxStyle}>
                <TextField
                  fullWidth
                  id="whatCanBeImprovedEdit"
                  label="What Can Be Improved?"
                  name="whatCanBeImproved"
                  defaultValue={whatCanBeImproved && whatCanBeImproved}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={GRID_SIZE_12}
              sm={GRID_SIZE_12}
              md={GRID_SIZE_12}
              lg={GRID_SIZE_12}
            >
              <Box sx={boxStyle}>
                <TextField
                  fullWidth
                  id="actionItemsEdit"
                  label="Action Items"
                  name="actionItems"
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
            Save
          </Button>
          <Button
            variant="outlined"
            sx={{ m: "16px 8px 0 0" }}
            color="error"
            onClick={handleSubmit}
          >
            Exit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
