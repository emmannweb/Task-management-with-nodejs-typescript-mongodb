import * as React from "react";
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
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useLogOutUserMutation } from "../redux/slices/userApiSlice";

const pages = ["Home", "Log In"];

const Header = () => {
  //show / hide button
  const { userInfo } = useSelector((state) => state.auth);
  const [logOutUser] = useLogOutUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  // log out user
  const logOut = async () => {
    try {
      await logOutUser();
      dispatch(logout());
      window.location.reload(true);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "oklch(0.218022 0.040901 233.565)",
        borderBottom: "1px solid oklch(0.382774 0.071686 233.169)",
      }}
      elevation={0}
    >
      <Container>
        {/* principal Menu */}
        <Toolbar disableGutters>
          <AssignmentIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            <Box component="span" sx={{ color: "#ffcd00", pr: 2 }}>
              Task
            </Box>
            management
          </Typography>

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AssignmentIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
              textTransform: "uppercase",
              fontSize: "16px",
            }}
          >
            <Box component="span" sx={{ color: "#ffcd00", pr: 2 }}>
              Gestão
            </Box>
            de tarefas
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* menu desktop */}

            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Home
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                to="/register"
                style={{ color: "white", textDecoration: "none" }}
              >
                Register
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  //sx={{ color: palette.primary.white }}
                  alt="Remy Sharp"
                  src=""
                />
              </IconButton>
            </Tooltip>
            <Menu
              PaperProps={{
                sx: {
                  "& 	.MuiMenu-list": {
                    bgcolor: "primary.main",
                    color: "#c1c1c1",
                    border: "1px solid oklch(0.382774 0.071686 233.169)",
                  },
                },
              }}
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#c1c1c1",
                    }}
                    to="/admin/dashboard"
                  >
                    Admin Dashboard
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#c1c1c1",
                    }}
                    to="/user/dashboard"
                  >
                    User Dashboard
                  </Link>
                </Typography>
              </MenuItem>

              {!userInfo ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "#c1c1c1",
                      }}
                      to="/login"
                    >
                      Log In
                    </Link>
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={logOut}>
                  <Typography
                    style={{ textDecoration: "none", color: "#c1c1c1" }}
                    textAlign="center"
                  >
                    Log Out
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
