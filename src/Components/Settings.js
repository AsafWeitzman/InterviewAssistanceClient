import { Avatar, Divider, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItem from "@mui/material/ListItem";
import { Box } from "@mui/system";

import { TABS } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";
import EditNameModal from "./EditNameModal";
import EditProfilePictureModal from "./EditProfilePictureModal";
import EditEmailModal from "./EditEmailModal";

const EditableListItem = ({ children, listItem, hasAvatar, avatar }) => {
  return (
    <List component="div" disablePadding>
      <ListItem sx={{ pl: 4 }}>
        {hasAvatar && (
          <Avatar alt="" src={avatar ? avatar : ""} sx={{ mr: "8px" }} />
        )}
        <ListItemText primary={listItem} />
        {children}
      </ListItem>
    </List>
  );
};

const Settings = () => {
  const { authState } = useContext(AuthContext);
  const [openEmail, setOpenEmail] = useState(false);
  const [openUserName, setOpenUserName] = useState(false);
  const [openProfilePicture, setOpenProfilePicture] = useState(false);

  const { id, userName, email, profilePicture } = authState;

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          ml: "8px",
        }}
      >
        {TABS.SETTINGS}
      </Typography>

      <Divider sx={{ m: "8px 0 8px 0" }} />
      <Box sx={{ display: "flex" }}>
        <List
          sx={{
            backgroundColor: "rgba(39, 39, 39, 0.8)",
            ml: "8px",
          }}
          subheader={
            <ListSubheader component="div" sx={{ p: 0 }}>
              Manage your connected experiences and account settings
            </ListSubheader>
          }
        >
          <ListItemButton
            onClick={() => {
              setOpenUserName(!openUserName);
            }}
          >
            <ListItemText primary="User Name" />
            {openUserName ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openUserName} timeout="auto" unmountOnExit>
            <EditableListItem listItem={userName}>
              <EditNameModal />
            </EditableListItem>
          </Collapse>

          <ListItemButton
            onClick={() => {
              setOpenEmail(!openEmail);
            }}
          >
            <ListItemText primary="Email" />
            {openEmail ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openEmail} timeout="auto" unmountOnExit>
            <EditableListItem listItem={email}>
              <EditEmailModal />
            </EditableListItem>
          </Collapse>

          {/* TODO: password */}

          <ListItemButton
            onClick={() => {
              setOpenProfilePicture(!openProfilePicture);
            }}
          >
            <ListItemText primary="Profile Picture" />
            {openProfilePicture ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openProfilePicture} timeout="auto" unmountOnExit>
            <EditableListItem
              listItem={userName}
              hasAvatar={true}
              avatar={profilePicture}
            >
              <EditProfilePictureModal />
            </EditableListItem>
          </Collapse>
        </List>

        <Avatar
          src={authState.profilePicture ? authState.profilePicture : ""}
          sx={{
            mt: "48px",
            ml: "48px",
            width: 140,
            height: 140,
          }}
        />
      </Box>
    </>
  );
};
export default Settings;
