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
import { Outlet, Link } from "react-router";
import { FiMenu, FiXCircle } from "react-icons/fi";
import SidebarUser from "../components/Sidebar/SidebarUser";
import useUser from "../hooks/useUser";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import SidebarMember from "../components/Sidebar/SidebarMember";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BiExit } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../hooks/useAxios";
import { errorAlert } from "../utils/alerts";
import LoadingState from "../utils/LoadingState";

const drawerWidth = 240;

function DashBoardLayout(props) {
  const { user, userLoading, setUserRole, userRole } = useUser();

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
    enabled: !userLoading && !!user, // ✅ wait until user is loaded
  });

  if (userLoading) {
    return <LoadingState />;
  }

  if (isLoading) {
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
          <ListItemButton onClick={handleDrawerClose}>
            <ListItemIcon>
              <FiXCircle size={20} />
            </ListItemIcon>
            <ListItemText primary="Close" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </div>

      <ListItem disablePadding>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
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
      <AppBar
        position="fixed"
        sx={{
          background: "teal",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Home Horizon
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ ml: "auto", display: { sm: "none" } }} // move to right
          >
            <FiMenu size={22} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          anchor="right" // 👈 this makes it slide in from the right
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
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
