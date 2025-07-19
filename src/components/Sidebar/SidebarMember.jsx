import {NavLink } from "react-router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Icons
import { FaUserCircle } from "react-icons/fa";
import { MdAnnouncement, MdPayment } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";

const SidebarMember = () => {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/dashboard" end>
          <ListItemIcon>
            <FaUserCircle size={20} />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/dashboard/make_payment" end>
          <ListItemIcon>
            <MdPayment size={20} />
          </ListItemIcon>
          <ListItemText primary="Make Payment" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="payment-history" end>
          <ListItemIcon>
            <BsClockHistory size={20} />
          </ListItemIcon>
          <ListItemText primary="Payment History" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="announcement" end>
          <ListItemIcon>
            <MdAnnouncement size={20} />
          </ListItemIcon>
          <ListItemText primary="Announcements" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default SidebarMember;
