import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import axios from "axios";

import { InterviewsContext } from "../context/InterviewsContext";
import { BUTTONS_TEXT } from "../utils/constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -80%)",
  width: "flex",
  bgcolor: "#272727",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export default function DeleteRowModal({ interviewId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { listOfInterviews, setListOfInterviews } =
    useContext(InterviewsContext);

  const deleteInterview = (interviewId) => {
    axios
      .delete(`http://localhost:3001/interviews/delete/${interviewId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        handleClose();
      });
  };

  const deleteHandler = () => {
    deleteInterview(interviewId);
    setListOfInterviews(
      listOfInterviews.filter((interview) => interview.id !== interviewId)
    );
  };

  return (
    <div>
      <IconButton
        aria-label="delete row"
        size="small"
        onClick={() => handleOpen(true)}
      >
        {open ? <DeleteForeverIcon /> : <DeleteForeverOutlinedIcon />}
      </IconButton>
      <Modal
        open={open}
        onClose={() => {
          handleClose(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Interview Process
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete your interview process?
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ m: "16px 8px 0 0" }}
            onClick={deleteHandler}
          >
            {BUTTONS_TEXT.YES}
          </Button>
          <Button
            variant="outlined"
            sx={{ m: "16px 8px 0 0" }}
            onClick={() => {
              handleClose(false);
            }}
          >
            {BUTTONS_TEXT.EXIT}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
