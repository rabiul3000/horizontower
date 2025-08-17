import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

import { Outlet, Link } from "react-router";
import { FiMenu, FiXCircle, FiSun, FiMoon } from "react-icons/fi";
import { BiExit } from "react-icons/bi";

import SidebarUser from "../components/Sidebar/SidebarUser";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import SidebarMember from "../components/Sidebar/SidebarMember";

import useUser from "../hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../hooks/useAxios";
import { errorAlert } from "../utils/alerts";
import LoadingState from "../utils/LoadingState";
import { useTheme } from "../context/ThemeContext";

const drawerWidth = 240;

function DashBoardLayout(props) {
  const { user, userLoading, setUserRole, userRole } = useUser();
  const { theme, toggleTheme } = useTheme();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const { error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosSecure.get("/user/get_user");
      setUserRole(response.data.role);
      return response.data;
    },
    enabled: !userLoading && !!user,
  });

  if (userLoading || isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return errorAlert(error.message);
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <div onClick={handleDrawerClose}>
        {userRole === "user" && <SidebarUser />}
        {userRole === "member" && <SidebarMember />}
        {userRole === "admin" && <SidebarAdmin />}
      </div>
      <Divider />

      <div className="lg:hidden">
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleDrawerClose}
            sx={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
          >
            <ListItemIcon
              sx={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
            >
              <FiXCircle size={20} />
            </ListItemIcon>
            <ListItemText primary="Close" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </div>

      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to="/"
          sx={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
        >
          <ListItemIcon
            sx={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
          >
            <BiExit size={20} className="-rotate-180" />
          </ListItemIcon>
          <ListItemText primary="Exit Dashboard" />
        </ListItemButton>
      </ListItem>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme === "dark" ? "#2e2e2e" : "#008080",
          color: theme === "dark" ? "#ffffff" : "#ffffff",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Horizon Tower
          </Typography>

          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            {/* Theme Toggle Button */}
            <Tooltip
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <IconButton
                onClick={toggleTheme}
                sx={{ color: "#ffffff", mr: 1 }}
              >
                {theme === "dark" ? <FiSun size={22} /> : <FiMoon size={22} />}
              </IconButton>
            </Tooltip>

            {/* Mobile Drawer Toggle */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <FiMenu size={22} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer */}
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme === "dark" ? "#2e2e2e" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#000000",
            },
          }}
          slotProps={{ root: { keepMounted: true } }}
        >
          {drawer}
        </Drawer>

        {/* Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme === "dark" ? "#2e2e2e" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#000000",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

DashBoardLayout.propTypes = {
  window: PropTypes.func,
};

export default DashBoardLayout;
