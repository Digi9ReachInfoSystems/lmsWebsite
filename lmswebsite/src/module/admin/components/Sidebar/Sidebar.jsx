import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
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
import LogoutIcon from "@mui/icons-material/Logout";
import { SideBarwrap } from "./Sidebar.styles";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaLayerGroup } from "react-icons/fa6";
import { MdOutlineAssignment } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { RiCustomerServiceLine } from "react-icons/ri";
import { AiTwotoneSchedule } from "react-icons/ai";
// import { MdOutlineAssignment } from "react-icons/md";
import { FaWpforms } from "react-icons/fa6";
import { AiTwotoneNotification } from "react-icons/ai";
import { MdOutlineSettings } from "react-icons/md";

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
      name: "Customer Queries",
      icon: <AddBox />,
      link: "/admin/customerQueries",
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
    {
      name: "Application Form Review",
      icon: <Assignment />,
      link: "/admin/applicationFormReview",
    },
    { name: "Circulars", icon: <Description />, link: "/admin/circular" },
    { name: "Settings", icon: <Settings />, link: "/admin/settings" },
  ];

  return (
    <SideBarwrap>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <span className="brand-logo">
            <img
              src="https://www.logoai.com/oss/icons/2021/10/27/rA73APprj8wskQ0.png"
              alt="Logo"
              className="logo"
            />
          </span>
          <div className="sidebar-logo"></div>
        </div>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <NavLink
                to="/admin/"
                activeClassName="active"
                className="menu-link"
              >
                <span className="menu-link-icon">
           
                  <RxDashboard />
                </span>
                <span className="menu-link-text">DashBoard</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/admin/createdBatches"
                activeClassName="active"
                className="menu-link"
              >
                <span className="menu-link-icon">
                  {/* <img src={Icons.Graph} alt="" /> */}
                  <FaLayerGroup />
                </span>
                <span className="menu-link-text">Manage Batches</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/admin/customerQueries"
                activeClassName="active"
                className="menu-link"
              >
                <span className="menu-link-icon">
                  {/* <img src={Icons.Graph} alt="" /> */}
                  <RiCustomerServiceLine />
                </span>
                <span className="menu-link-text">Customer Queries</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/admin/scheduleClass"
                activeClassName="active"
                className="menu-link"
              >
                <span className="menu-link-icon">
                  {/* <img src={Icons.Graph} alt="" /> */}
                  <AiTwotoneSchedule />
                </span>
                <span className="menu-link-text">Schedule Class</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/admin/createAssignment"
                activeClassName="active"
                className="menu-link"
              >
                <span className="menu-link-icon">
                 

                  <MdOutlineAssignment />
                </span>
                <span className="menu-link-text">Create Assignment</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/admin/applicationFormReview"
                activeClassName="active"
                className="menu-link"
              >
                <span className="menu-link-icon">
                  {/* <img src={Icons.Graph} alt="" /> */}
                  <FaWpforms />
                </span>
                <span className="menu-link-text">Application Form</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                to="/admin/circular"
                activeClassName="active"
                className="menu-link"
              >
                <span className="menu-link-icon">
                  {/* <img src={Icons.Graph} alt="" /> */}
                  <AiTwotoneNotification />
                </span>
                <span className="menu-link-text">Circulars</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/admin/settings"
                activeClassName="active"
                className="menu-link"
              >
                <span className="menu-link-icon">
                  {/* <img src={Icons.Graph} alt="" /> */}
                  <MdOutlineSettings />
                </span>
                <span className="menu-link-text">Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </SideBarwrap>
  );
};

export default Sidebar;
