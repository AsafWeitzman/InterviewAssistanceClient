import { Divider, ListItemIcon, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";

import { TABS } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";
import EditNameModal from "./EditNameModal";

const Settings = () => {
  const { authState } = useContext(AuthContext);
  const [openEmail, setOpenEmail] = useState(false);
  const [openUserName, setOpenUserName] = useState(false);
  const [openProfilePicture, setOpenProfilePicture] = useState(false);

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

      <List
        sx={{
          width: "100%",
          backgroundColor: "rgba(39, 39, 39, 0.8)",
          ml: "8px",
        }}
        component="nav"
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
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary={authState.userName} />
              <EditNameModal />
            </ListItem>
          </List>
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
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={authState.email} />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          onClick={() => {
            setOpenProfilePicture(!openProfilePicture);
          }}
        >
          <ListItemText primary="Profile Picture" />
          {openProfilePicture ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openProfilePicture} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={authState.email} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
};
export default Settings;
