import React, { useState, useEffect } from "react";
import { RxDashboard } from "react-icons/rx";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaLayerGroup } from "react-icons/fa6";
import { MdOutlineAssignment } from "react-icons/md";
import { AiTwotoneNotification, AiTwotoneSchedule } from "react-icons/ai";
import { MdOutlineSettings } from "react-icons/md";
import { VscSignOut } from "react-icons/vsc";
import { FaUsersGear } from "react-icons/fa6";
import { SideBarwrap } from "./Sidebar.styles"; // Your styled component for sidebar
import styled from "styled-components";
import { RiCustomerServiceLine } from "react-icons/ri";
import { FaWpforms } from "react-icons/fa6";
import { PiListChecksThin } from "react-icons/pi";
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
   //  max-height:100vh; /* Default fixed height */
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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { name: "Dashboard", icon: <RxDashboard />, link: "/teacher/dashboard" },
    {
      name: "Manage Batches",
      icon: <FaLayerGroup />,
      link: "/teacher/dashboard/batches",
    },
    {
      name: "Task Management",
      icon: <RiCustomerServiceLine />,
      link: "/teacher/dashboard/quizz/assignedBatch",
    },
    {
      name: "Circulars",
      icon: <FaWpforms />,
      link: "/teacher/dashboard/circular",
    },
    {
      name: "Schedule",
      icon: <AiTwotoneNotification />,
      link: "/teacher/dashboard/meetings",
    },
    {
      name: "Attendance",
      icon: <FaBuildingCircleCheck />,
      link: "/teacher/dashboard/teacherAttendance",
    },
    {
      name: "Reschedule Meeting",
      icon: <PiListChecksThin />,
      link: "/teacher/dashboard/meetingReschedule",
    },
    {
      name: "Settings",
      icon: <MdOutlineSettings />,
      link: "/teacher/dashboard/setting",
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
            Teacher Dashboard
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
