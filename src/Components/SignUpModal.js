import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Divider, Grid, TextField } from "@mui/material";
import axios from "axios";

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
const GRID_SIZE_12 = 12;

const SignUpModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      userName: formData.get("userName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axios.post(`http://localhost:3001/auth`, data).then(
      (response) => {
        handleClose(!open);
      },
      (e) => {
        console.log("Oh no: " + e);
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
              xs={GRID_SIZE_12}
              sm={GRID_SIZE_12}
              md={GRID_SIZE_12}
              lg={GRID_SIZE_12}
            >
              <Box sx={boxStyle}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
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
                {/* todo: validate email */}
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
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
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label="Password"
                  name="password"
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
            Sign Up
          </Button>
          <Button
            variant="outlined"
            sx={{ m: "16px 8px 0 0" }}
            color="error"
            onClick={handleClose}
          >
            Exit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SignUpModal;
