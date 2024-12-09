import React from "react";
import { Breadcrumb } from "antd"; // Importing Ant Design's Breadcrumb
import { MdNotificationsNone, MdOutlineMenu } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom"; // Importing useLocation from react-router-dom
import { AppBarWrap } from "./Navbar.Styles"; // Adjust the path accordingly

function NavBar() {
  const location = useLocation(); 

  // Function to generate breadcrumb items based on the current route
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x); // Split the path into segments
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/admin">Home</Link>
      </Breadcrumb.Item>,
    ];

    let currentPath = "/admin";
    // Add the breadcrumbs dynamically based on the path segments
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      breadcrumbItems.push(
        <Breadcrumb.Item key={currentPath}>
          <Link to={currentPath}>
            {segment.charAt(0).toUpperCase() + segment.slice(1)} {/* Capitalize first letter */}
          </Link>
        </Breadcrumb.Item>
      );
    });

    return breadcrumbItems;
  };

  return (
    <AppBarWrap>
      <div className="appbar-content">
        {/* Left Section */}
        <div className="appbar-left">
          {/* Sidebar Toggle Button */}
          {/* Title / Logo */}
        </div>

        {/* Center Section - Breadcrumb */}
        <div className="appbar-breadcrumb">
          <Breadcrumb className="text-sm">
            {generateBreadcrumbs()} {/* Render the dynamic breadcrumbs */}
          </Breadcrumb>
        </div>

        {/* Right Section */}
        <div className="appbar-right">
          {/* Search Bar */}
          {/* Notification Icon */}
          <button className="appbar-icon-btn relative text-gray-500 hover:text-pink-500">
            <MdNotificationsNone size={24} />
            {/* Optional Unread Count */}
            <span className="icon-btn-dot"></span>
          </button>
          {/* Profile Dropdown */}
        </div>
      </div>
    </AppBarWrap>
  );
}

export default NavBar;

