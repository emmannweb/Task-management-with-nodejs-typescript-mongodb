import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  menuClasses,
} from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import Person2Icon from "@mui/icons-material/Person2";
import { logout } from "../../redux/slices/authSlice";
import { useLogOutUserMutation } from "../../redux/slices/userApiSlice";

const SidebarAdm = () => {
  const { collapsed } = useProSidebar();
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [logOutUser] = useLogOutUserMutation();

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

  const menuStyles = {
    button: {
      [`&.${menuClasses.button}`]: {
        color: "#fafafa",
      },

      "&:hover": {
        backgroundColor: palette.primary.main,
        color: "#fafafa",
      },
    },

    icon: {
      [`&.${menuClasses.icon}`]: {
        backgroundColor: "oklch(0.382774 0.071686 233.169)",
      },
    },
  };

  return (
    <>
      <Sidebar
        backgroundColor={palette.secondary.main}
        style={{ borderRightStyle: "none" }}
        defaultCollapsed={true}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            {collapsed ? (
              <>
                <Box sx={{ display: "flex", justifyContent: "center", pt: 3 }}>
                  <Box>
                    <AssignmentIcon
                      sx={{
                        display: { xs: "none", md: "flex" },
                        color: "#ffcd00",
                        fontSize: "60px",
                        pb: 3,
                      }}
                    />
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    pt: 3,
                    pl: 2,
                    pb: 3,
                  }}
                >
                  <IconButton>
                    <AssignmentIcon
                      sx={{
                        display: { xs: "none", md: "flex" },
                        color: "#fafafa",
                        fontSize: "25px",
                      }}
                    />
                  </IconButton>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      fontSize: "25px",
                      letterSpacing: ".1rem",
                      color: "inherit",
                      textDecoration: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    <Box component="span" sx={{ color: "#ffcd00", pr: 2 }}>
                      Management
                    </Box>
                  </Typography>
                </Box>
              </>
            )}

            {/* admin menu */}
            {userInfo.role === "admin" ? (
              <Menu menuItemStyles={menuStyles}>
                <MenuItem
                  component={<Link to="/admin/dashboard" />}
                  icon={<DashboardIcon sx={{ color: palette.yellow2 }} />}
                >
                  {" "}
                  Dashboard{" "}
                </MenuItem>

                <MenuItem
                  component={<Link to="/admin/task" />}
                  icon={<AssignmentIcon sx={{ color: palette.yellow2 }} />}
                >
                  {" "}
                  Tasks{" "}
                </MenuItem>

                <MenuItem
                  component={<Link to="/admin/users" />}
                  icon={<GroupAddIcon sx={{ color: palette.yellow2 }} />}
                >
                  {" "}
                  Users{" "}
                </MenuItem>
              </Menu>
            ) : (
              <Menu menuItemStyles={menuStyles}>
                <MenuItem
                  component={<Link to="/user/dashboard" />}
                  icon={<DashboardIcon sx={{ color: palette.yellow2 }} />}
                >
                  {" "}
                  Dashboard{" "}
                </MenuItem>

                <MenuItem
                  component={<Link to="/user/task" />}
                  icon={<AssignmentIcon sx={{ color: palette.yellow2 }} />}
                >
                  {" "}
                  My Tasks{" "}
                </MenuItem>

                <MenuItem
                  component={<Link to="/user/edit/info" />}
                  icon={<Person2Icon sx={{ color: palette.yellow2 }} />}
                >
                  {" "}
                  Update Info{" "}
                </MenuItem>
              </Menu>
            )}
          </Box>
          <Box sx={{ pb: 3 }}>
            <Menu menuItemStyles={menuStyles}>
              <MenuItem
                icon={
                  <LoginIcon sx={{ color: palette.yellow2 }} onClick={logOut} />
                }
              >
                {" "}
                Log Out{" "}
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Sidebar>
    </>
  );
};

export default SidebarAdm;
