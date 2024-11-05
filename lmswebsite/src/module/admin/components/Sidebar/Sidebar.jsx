import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  Dashboard,
  AddBox,
  Assignment,
  AccessTime,
  Person,
  Mail,
  Description,
  Settings,
  Menu as MenuIcon,
} from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { SideBarwrap } from "./Sidebar.styles";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <Dashboard />, link: "/admin/" },
    {
      name: "Assigned Batches",
      icon: <AddBox />,
      link: "/admin/createdBatches",
    },
    {
      name: "Schedule Class",
      icon: <AccessTime />,
      link: "/admin/scheduleClass",
    },
    {
      name: "Create Assignment",
      icon: <Assignment />,
      link: "/admin/createAssignment",
    },
    { name: "Circulars", icon: <Description />, link: "/admin/circular" },
    { name: "Settings", icon: <Settings />, link: "/admin/settings" },
  ];

  return (
    <SideBarwrap>
      <div className="sidebar-logo">
        <img
          src="https://www.logoai.com/oss/icons/2021/10/27/rA73APprj8wskQ0.png"
          alt="Logo"
          className="logo"
        />
      </div>

      <div className="sidebar-container">
        <IconButton
          className="toggle-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <MenuIcon />
        </IconButton>
        <div className="menu-container">
          {menuItems.map((item) => (
            <Link
              to={item.link}
              key={item.name}
              style={{ textDecoration: "none" }}
            >
              <div
                className={`menu-item ${activeItem === item.name ? "active" : ""
                  }`}
                onClick={() => setActiveItem(item.name)}
              >
                <div className="menu-icon">{item.icon}</div>
                {!isCollapsed && <div className="menu-text">{item.name}</div>}
              </div>
            </Link>
          ))}

          <div
            className={`menu-item ${activeItem === 'Logout' ? "active" : ""
              }`}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <div className="menu-icon"><LogoutIcon /></div>
            {!isCollapsed && <div className="menu-text">Logout</div>}
          </div>
        </div>
      </div>
    </SideBarwrap>
  );
};

export default Sidebar;
