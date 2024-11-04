// Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, InputBase, Box, Badge } from '@mui/material';
import { Mail, NotificationsNone } from '@mui/icons-material';
import './Navbar.css'; // Importing CSS styles

const Navbar = () => {
  return (
    <Box position="static" className="navbar">
      <Toolbar className="navbar-toolbar">
        {/* Search Bar */}
        {/* <Box className="search-bar">
          <InputBase
            placeholder="Search..."
            className="search-input"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box> */}

        {/* Icons and Profile */}
        <Box className="navbar-icons">
          <IconButton>
            <Badge badgeContent={2} color="error">
              <Mail className="icon" />
            </Badge>
          </IconButton>

          <IconButton>
            <Badge badgeContent={4} color="error">
              <NotificationsNone className="icon" />
            </Badge>
          </IconButton>

          <Avatar 
            src="https://i.pravatar.cc/150?img=3" 
            alt="Profile" 
            className="profile-picture" 
          />
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Navbar;
