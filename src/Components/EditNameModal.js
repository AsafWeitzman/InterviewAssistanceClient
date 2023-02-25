import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, IconButton, TextField } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";

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

const GRID_SIZE_12 = 12;

export default function EditNameModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { authState, setAuthState } = useContext(AuthContext);

  const { id } = authState;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      userName: formData.get("userName"),
    };

    axios
      .put(`http://localhost:3001/auth/editUserName/${id}`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(
        (response) => {
          if (response.data.error) {
            alert("Something went wrong!");
          } else {
            handleClose(!open);
            localStorage.setItem("accessToken", response.data.token);
            setAuthState({
              ...authState,
              userName: response.data.userName,
            });
          }
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
            Edit Name
          </Typography>

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
                  autoComplete="off"
                  defaultValue={authState.userName}
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
            onClick={handleClose}
          >
            Exit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
