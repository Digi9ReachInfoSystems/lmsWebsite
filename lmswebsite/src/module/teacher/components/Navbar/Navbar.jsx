import React ,{ useState, useEffect } from "react";
import { AppBarWrap } from "./Navbar.Styles";
import { MdNotificationsNone } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { MdOutlineMenu } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { FaTimes } from "react-icons/fa"; // Import "X" icon from react-icons
import { Dropdown, Menu, Button, Badge } from "antd";
import { getTeacherByAuthId } from "../../../../api/teacherApi";
import { getUnreadNotifications, markAsRead } from "../../../../api/notificationApi";

// import profileIcon from "/path/to/profile-icon.png"; // Replace with your profile icon path
// // import logoIcon from "/path/to/logo-icon.png"; // Replace with your logo icon path

function NavBar() {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);
  const[load, setLoad] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
   const location = useLocation(); 
   const navigate= useNavigate();
  
  useEffect(() => {
    const apiCaller = async () => {
      const authId = JSON.parse(localStorage.getItem("sessionData")).userId;
      const user = await getTeacherByAuthId(authId);
      setUserId(user.teacher.user_id._id);
      const storedNotifications = await getUnreadNotifications(user.teacher.user_id._id);
      if (storedNotifications) {
        setNotifications(storedNotifications);
      }
    }
    apiCaller();

  }, [load,navigate]);




  // Function to clear individual notification
  const clearNotification = async (id) => {
    await markAsRead(userId, id);
    setLoad(!load); 
    setDropdownVisible(true)
  };

  // Function to clear all notifications
  const clearAllNotifications = () => {
    notifications.forEach((notification) => {
      clearNotification(notification._id);
    })
    setDropdownVisible(false)
  };
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x); // Split the path into segments
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/teacher/dashboard">Home</Link>
      </Breadcrumb.Item>,
    ];

    let currentPath = "/teacher";
    // Add the breadcrumbs dynamically based on the path segments
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      breadcrumbItems.push(
        <Breadcrumb.Item key={currentPath}>
          <Link to={currentPath}>
            {segment.charAt(0).toUpperCase() + segment.slice(1)}{" "}
            {/* Capitalize first letter */}
          </Link>
        </Breadcrumb.Item>
      );
    });

    return breadcrumbItems;
  };

   // Generate Menu for Notifications
      const notificationMenu = (
        <Menu>
          <Menu.Item disabled style={{ fontWeight: "bold" }}>
            Notifications
          </Menu.Item>
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <Menu.Item
                key={notif._id}
                className={`notification-item`}
    
              >
                <div className="menuItem" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
    
    
                  <div className="notification-message flex items-center space-x-3">
                    <div
                      className={`status-icon ${notif.is_global ? "bg-green-500" : "bg-yellow-500"
                        }`}
                    />
                    <span
                      className={`text-sm font-medium ${notif.is_global ? "text-green-600" : "text-yellow-600"
                        }`}
                    >
                      {notif.title} -<br /> {notif.message}
                    </span>
                  </div>
                  <Button
                    type="link"
                    icon={<FaTimes />}
                    size="small"
                    className="clear-btn"
                    onClick={() => clearNotification(notif._id)}
                  />
                </div>
              </Menu.Item>
            ))
          ) : (
            <Menu.Item disabled>No notifications</Menu.Item>
          )}
          {notifications.length > 0 && (
            <Menu.Item style={{textAlign: "center"}}>
              <Button
                type="link"
                onClick={clearAllNotifications}
                className="clear-all-btn w-full text-center"
                style={{
                  color: "#ff4747",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                Clear All
              </Button>
            </Menu.Item>
          )}
        </Menu>
      );
    
      return (
        <AppBarWrap>
          <div className="appbar-content">
            <div className="appbar-left"></div>
    
            <div className="appbar-breadcrumb">
              <Breadcrumb className="text-sm">
                {/* Assuming generateBreadcrumbs() is a function to handle routing */}
                {generateBreadcrumbs()}
              </Breadcrumb>
            </div>
    
            <div className="appbar-right">
              {/* Notification Icon */}
              <Dropdown overlay={notificationMenu} visible={dropdownVisible} onVisibleChange={setDropdownVisible} trigger={['click']}>
                <Button
                  className="notification-btn"
                  icon={<MdNotificationsNone size={24} />}
                  shape="circle"
                  size="large"
                >
                  <Badge count={notifications.length} />
                </Button>
              </Dropdown>
            </div>
          </div>
        </AppBarWrap>
      );
    }
    
    export default NavBar;