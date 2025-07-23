import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { MdLogout } from "react-icons/md"; // React-icons replacement
import { RiDashboardLine } from "react-icons/ri";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";
import useUser from "../../hooks/useUser";

export default function AccountMenu() {
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate("/dashboard");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut(auth);
    setAnchorEl(null);
  };

  const handleGotoDashboard = () => {
    setAnchorEl(null);
    navigate("/dashboard");
  };


  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          textAlign: "center",
        }}
      >
        <Tooltip title="settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar src={user?.photoURL} sx={{ width: 40, height: 40 }}>
              {user?.displayName}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} disabled>
          <Avatar src={user?.photoURL} />
          {user?.displayName}
        </MenuItem>

        <Divider />
        <MenuItem onClick={handleGotoDashboard}>
          <ListItemIcon>
            <RiDashboardLine size={20} />
          </ListItemIcon>
          Dashboard
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <MdLogout size={20} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
