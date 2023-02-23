import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { AuthContext } from "../context/AuthContext";
import { ReactComponent as Logo55X40 } from "../assets/svg/Logo55X40.svg";

const pages = ["Open Processes", "Closed Processes", "Successful Processes"];
const goTo = (page) => {
  switch (page) {
    case pages[0]:
      return "/interviews";
    case pages[1]:
      return "/closedInterviews";
    case pages[2]:
      return "/successfulInterviews";
    default:
      break;
  }
};

const LogoAppBar = ({ style }) => {
  return (
    <Box
      component={motion.div}
      whileHover={{ rotate: 180 }}
      sx={{ margin: "4px", ...style }}
    >
      <Logo55X40 />
    </Box>
  );
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    localStorage.removeItem("accessToken");
    setAuthState({
      id: 0,
      userName: "",
      email: "",
      status: false,
    });
  };

  const handleProfile = () => {
    handleCloseUserMenu();
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <LogoAppBar style={{ display: { xs: "none", md: "flex" } }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Interviews Manager
          </Typography>
          {authState.status && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, key) => (
                  <Link
                    key={key}
                    style={{ textDecoration: "none" }}
                    to={goTo(page)}
                  >
                    <MenuItem
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{
                        color: "white",
                        display: "block",
                      }}
                    >
                      <Typography>{page}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          )}
          <LogoAppBar style={{ display: { xs: "flex", md: "none" } }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 500,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Interviews Manager
          </Typography>
          {authState.status && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, key) => (
                <Link
                  key={key}
                  style={{ textDecoration: "none" }}
                  to={goTo(page)}
                >
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      m: 2,
                      color: "white",
                      display: "block",
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>
          )}

          {authState.status && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    {authState.userName.length
                      ? authState.userName[0].toUpperCase()
                      : null}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link style={{ textDecoration: "none" }} to={"/profile"}>
                  <MenuItem
                    onClick={handleProfile}
                    sx={{
                      color: "white",
                      display: "block",
                    }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                </Link>

                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
