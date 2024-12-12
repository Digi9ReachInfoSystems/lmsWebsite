import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { PiListChecksThin } from "react-icons/pi";
import { FaLayerGroup, FaWpforms, FaTools } from "react-icons/fa";
import { AiTwotoneNotification } from "react-icons/ai";
import { RiCustomerServiceLine } from "react-icons/ri";
import { MdOutlineSettings } from "react-icons/md";
import { VscSignOut } from "react-icons/vsc";
import styled from "styled-components";

// Styled components for Sidebar
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
  //  max-height:100vh; /* Default fixed height */
  overflow-y: auto;
  scroll-behavior: smooth;
    &::-webkit-scrollbar {
    width: 0px;
  }
  z-index: 2000;
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
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => setIsSidebarExpanded((prev) => !prev);
  const navigate = useNavigate();

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      try {
        // Perform the logout action here (e.g., clear localStorage or call logout API)
        // For example, clearing token:
        localStorage.clear();

        // If using a global state management (like Context or Redux), dispatch a logout action here
        // e.g., dispatch(logout());

        // Navigate to login page or home page
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        // Optionally, show an error message to the user
      }
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <RxDashboard />, link: "/admin/" },
    {
      name: "Manage Batches",
      icon: <FaLayerGroup />,
      link: "/admin/createdBatches",
    },
    {
      name: "Customer Queries",
      icon: <RiCustomerServiceLine />,
      link: "/admin/customerQueries",
    },
    {
      name: "Application Form",
      icon: <FaWpforms />,
      link: "/admin/applicationFormReview",
    },
    {
      name: "Circulars",
      icon: <AiTwotoneNotification />,
      link: "/admin/circular",
    },
    {
      name: "Custom Package",
      icon: <AiTwotoneNotification />,
      link: "/admin/customPackage",
    },
    { name: "Manage Content", icon: <FaTools />, link: "/admin/manageContent" },
    {
      name: "Manage Attendance",
      icon: <PiListChecksThin />,
      link: "/admin/manageAttendance",
    },
    { name: "Settings", icon: <MdOutlineSettings />, link: "/admin/settings" },
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
          <span style={{ color: "white", fontSize: "20px" }}>Admin Panel</span>
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
