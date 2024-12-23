import React, { useState, useEffect } from "react";
import { RxDashboard } from "react-icons/rx";
import CloseIcon from "@mui/icons-material/Close";
// import { IconButton } from "@mui/material";

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
import { PiListChecksThin } from "react-icons/pi";
// import { MdOutlineAssignment } from "react-icons/md";
import { FaWpforms } from "react-icons/fa6";
import { AiTwotoneNotification } from "react-icons/ai";
import { MdVideoCall } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { VscSignOut } from "react-icons/vsc";
import { MdPayment } from "react-icons/md";
import styled from "styled-components";
import { FaBuildingCircleCheck } from "react-icons/fa6";
const SidebarWrapper = styled.div`
  width: ${(props) => (props.isHovered ? "240px" : "80px")};
  height: 100vh;
  background-color: #2f3542;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
   overflow-y: auto;
  scroll-behavior: smooth;
    &::-webkit-scrollbar {
    width: 0px;
  }
  &:hover {
    width: 240px;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isHovered ? "space-between" : "center")};
  margin-bottom: 20px;
  color: white;
`;

const SidebarToggle = styled.div`
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  display: ${(props) => (props.isHovered ? "none" : "block")};
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => (props.active ? "#fff" : "#bbb")};
  margin: 15px 0;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #ff0080;
  }

  svg {
    margin-right: 10px;
    font-size: 1.2rem;
  }

  a {
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
    width: 100%;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  color: ${(props) => (props.active ? "#fff" : "#bbb")};
  margin: 15px 0;
  background: none;
  border: none;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #ff0080;
  }

  svg {
    margin-right: 10px;
    font-size: 1.2rem;
  }
`;

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => setIsSidebarExpanded((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear(); // Clear all items in localStorage
    navigate("/"); // Redirect to the login page or desired route
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <RxDashboard />, link: "/student/dashboard" },
    {
      name: "Manage Batches",
      icon: <FaLayerGroup />,
      link: "/student/dashboard/assignedBatches",
    },
    {
      name: "Task Management",
      icon: <RiCustomerServiceLine />,
      link: "/student/dashboard/taskBoard",
    },
    {
      name: "Circulars",
      icon: <FaWpforms />,
      link: "/student/dashboard/circular",
    },
    // {
    //   name: "Attendance",
    //   icon: <FaBuildingCircleCheck/>,
    //   link: "/student/dashboard/attendance",
    // },
    {
      name: "Assignments",
      icon: <RiCustomerServiceLine />,
      link: "/student/dashboard/assignments",
    },
    {
      name: "Meeting",
      icon: <AiTwotoneNotification />,
      link: "/student/dashboard/meetings",
    },
    {
      name: "Manage Attendance",
      icon: <PiListChecksThin />,
      link: "/student/dashboard/attendance",
    },
    {
      name: "Settings",
      icon: <MdOutlineSettings />,
      link: "/student/dashboard/setting",
    },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.name);
    navigate(item.link);
  };

  return (
    <SidebarWrapper
      isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SidebarHeader isHovered={isHovered}>
        {!isHovered && (
          <SidebarToggle isHovered={isHovered} onClick={toggleSidebar}>
            ☰
          </SidebarToggle>
        )}
        {isHovered && (
          <span style={{ color: "white", fontSize: "20px" }}>
            Student Dashboard
          </span>
        )}
      </SidebarHeader>
      {menuItems.map((item) => (
        <MenuItem
          key={item.name}
          active={activeItem === item.name}
          onClick={() => handleItemClick(item)}
        >
          <Link to={item.link}>
            {item.icon}
            {isHovered && item.name}
          </Link>
        </MenuItem>
      ))}
      {/* Logout Button */}
      <LogoutButton active={activeItem === "Logout"} onClick={handleLogout}>
        <VscSignOut />
        {isHovered && "Logout"}
      </LogoutButton>
    </SidebarWrapper>
  );
};

export default Sidebar;
