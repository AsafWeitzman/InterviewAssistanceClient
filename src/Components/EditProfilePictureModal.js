import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import axios from "axios";
import { grey } from "@mui/material/colors";

import { AuthContext } from "../context/AuthContext";
import { BUTTONS_TEXT } from "../utils/constants";

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

export default function EditProfilePictureModal() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleExit = () => {
    setOpen(false);
    setIsProfilePictureChanged(false);
    setNewImageObj({
      ...authState.profilePicture,
    });
  };

  const [newImageObj, setNewImageObj] = useState({
    file: "",
    imagePreviewUrl: "",
  });
  const [isProfilePictureChanged, setIsProfilePictureChanged] = useState(false);

  const { id } = authState;

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file.size > 1600000) {
      alert("File is too big!");
      e.target.value = "";
      return;
    }

    reader.onloadend = () => {
      setNewImageObj({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    setIsProfilePictureChanged(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("profilePicture", newImageObj.file);
    axios
      .put(`http://localhost:3001/auth/editProfilePicture/${id}`, formData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then(
        (response) => {
          if (response.data.error) {
            alert("Something went wrong!");
          } else {
            handleClose(!open);
            console.log("response: ", response.data);
            setAuthState({
              ...authState,
              profilePicture: response.data.profilePicture,
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
            variant="h6"
            component="h2"
            sx={{
              letterSpacing: ".2rem",
            }}
          >
            Edit Profile Picture
          </Typography>
          <label htmlFor="photo-upload">
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              name="profilePicture"
              multiple={false}
              style={{ display: "none" }}
              onChange={photoUpload}
            />
            <Avatar
              src={
                isProfilePictureChanged
                  ? newImageObj.imagePreviewUrl
                  : authState.profilePicture
              }
              sx={{
                m: "32px",
                width: 200,
                height: 200,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: grey[800],
                },
              }}
            />
          </label>

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
            onClick={handleExit}
          >
            {BUTTONS_TEXT.EXIT}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
