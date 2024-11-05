import React from "react";
import { AppBarWrap } from "./Navbar.Styles";
import { MdOutlineMenu, MdNotificationsNone } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // This can be removed if not needed

function NavBar() {
  return (
    <AppBarWrap>
      <div className="appbar-content">
        <div className="appbar-left">
          <button type="button" className="sidebar-open-btn">
            <MdOutlineMenu size={24} />
          </button>
          <h3 className="appbar-title">Dashboard</h3>
        </div>
        <div className="appbar-right">
          <div className="appbar-search">
            <form>
              <div className="input-group">
                <span className="input-icon">
                  {/* Replace this with any relevant icon if needed */}
                  <img
                    src="/path/to/search-icon.png" // Replace with your search icon path
                    alt=""
                    className="input-icon-img"
                  />
                </span>
                <input
                  type="text"
                  placeholder="Search Here ..."
                  className="input-control"
                  disabled // Just for UI, disable to remove functionality
                />
              </div>
            </form>
          </div>

          {/* Notification Bell Icon */}
          <button className="notification-bell">
            <MdNotificationsNone size={24} />
            {/* Static unread count for UI purpose */}
            <span className="unread-count">3</span>
          </button>
        </div>
      </div>

      {/* Static modal for UI purposes */}
      <div className="notification-modal"></div>
    </AppBarWrap>
  );
}

export default NavBar;
