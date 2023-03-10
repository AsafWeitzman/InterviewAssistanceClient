import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Divider, Grid, Snackbar, TextField } from "@mui/material";
import axios from "axios";

import { BUTTONS_TEXT, GRID_SIZE, SNACKBAR_MSG } from "../utils/constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BlackTextButton = styled(Button)({
  color: "black",
  textTransform: "none",
  fontWeight: "bold",

  "&:hover": {
    textDecoration: "underline",
    backgroundColor: "none",
  },
});

const boxStyle = { m: "16px 8px 0 0" };

const SignUpModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState(null);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      userName: formData.get("userName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axios.post(`http://localhost:3001/auth/`, data).then(
      (response) => {
        handleClose(!open);
        setSnackbarContent(SNACKBAR_MSG.USER_CREATED_SUCCESSFULLY);
        setOpenSnackBar(true);
      },
      (e) => {
        console.log("Oh no: " + e);
        setSnackbarContent(SNACKBAR_MSG.ERR_USER_CREATED);
      }
    );
  };

  return (
    <div>
      <BlackTextButton type="text" onClick={handleOpen}>
        Don't have an account? Sign Up
      </BlackTextButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign Up
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Please fill in this form to create an account.
          </Typography>
          <Divider />
          <Grid container>
            <Grid
              item
              xs={GRID_SIZE.LARGE_LENGTH}
              sm={GRID_SIZE.LARGE_LENGTH}
              md={GRID_SIZE.LARGE_LENGTH}
              lg={GRID_SIZE.LARGE_LENGTH}
            >
              <Box sx={boxStyle}>
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  id="userName"
                  label="User Name"
                  name="userName"
                  inputProps={{ maxLength: 30 }}
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
                {/* todo: validate email */}
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  id="email"
                  label="Email"
                  name="email"
                  inputProps={{ maxLength: 50 }}
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
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label="Password"
                  name="password"
                  inputProps={{ maxLength: 30 }}
                />
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 2 }} />

          <Button
            variant="outlined"
            sx={boxStyle}
            color="success"
            type="submit"
          >
            {BUTTONS_TEXT.SIGN_UP}
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
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message={snackbarContent}
      />
    </div>
  );
};

export default SignUpModal;
