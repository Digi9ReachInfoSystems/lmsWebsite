import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
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
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '../../../../style/theme/theme'; // Import media queries

const SidebarContainer = styled.div`
    width: ${(props) => (props.isCollapsed ? '60px' : '23vw')};
    height: calc(100vh - 64px);
    padding: 100px 20px 20px 20px;
    background: ${(props) => props.theme.colors.seasalt};
    position: fixed;
    top: 64px;
    overflow-y: auto;
    transition: width 0.3s;

    ${media.lg`
        width: ${(props) => (props.isCollapsed ? '60px' : '20vw')};
    `}

    ${media.md`
        width: ${(props) => (props.isCollapsed ? '60px' : '25vw')};
        padding: 60px 10px;
    `}

    ${media.sm`
        width: 60px;
        height: auto;
        position: relative;
        padding: 50px 5px;
    `}
`;

const MenuContainer = styled(List)`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const MenuItem = styled(ListItem)`
    display: flex;
    align-items: center;
    gap: ${(props) => (props.isCollapsed ? '0' : '18px')};
    justify-content: ${(props) => (props.isCollapsed ? 'center' : 'flex-start')};
    color: ${(props) => props.theme.colors.black};
    border-radius: 11px;
    transition: background 0.3s, color 0.3s;

    &.active {
        background: #000000;
        color: ${(props) => props.theme.colors.white};
        
        .menu-icon {
            color: ${(props) => props.theme.colors.white};
            background: #000000;
            border-radius: 11px;
            padding: 4px;
        }
    }

    &:hover {
        background: ${(props) => props.theme.colors.gray700};
        color: ${(props) => props.theme.colors.white};

        .menu-icon {
            color: ${(props) => props.theme.colors.white};
        }
    }

    ${media.sm`
        flex: 1 1 100%;
        padding: 8px;
    `}
`;

const MenuIconWrapper = styled(ListItemIcon)`
    color: ${(props) => props.theme.colors.black};
    display: flex;
    justify-content: center;

    ${media.sm`
        margin: 0;
    `}
`;

const ToggleButton = styled(IconButton)`
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;

    ${media.sm`
        display: block;
    `}
`;

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { name: 'Dashboard', icon: <Dashboard />, link: '/admin/' },
        { name: 'Create Batch', icon: <AddBox />, link: '/admin/createdBatches' },
        { name: 'Application Form', icon: <Assignment />, link: '/admin/applicationFormReview' },
        { name: 'Customer Queries', icon: <AccessTime />, link: '/admin/customerQueries' },
        { name: 'User Management', icon: <Person />, link: '/' },
        { name: 'Registered List', icon: <Mail />, link: '/admin/registeredList' },
        { name: 'Circulars', icon: <Description />, link: '/admin/circular' },
        { name: 'Settings', icon: <Settings />, link: '/' },
    ];

    return (
        <SidebarContainer isCollapsed={isCollapsed}>
            <ToggleButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuIcon />
            </ToggleButton>
            <MenuContainer>
                {menuItems.map((item) => (
                    <Link to={item.link} key={item.name} style={{ textDecoration: 'none' }}>
                        <MenuItem
                            button
                            className={activeItem === item.name ? 'active' : ''}
                            onClick={() => setActiveItem(item.name)}
                            isCollapsed={isCollapsed}
                        >
                            <MenuIconWrapper className="menu-icon">{item.icon}</MenuIconWrapper>
                            {!isCollapsed && <ListItemText primary={item.name} />}
                        </MenuItem>
                    </Link>
                ))}
            </MenuContainer>
        </SidebarContainer>
    );
};

export default Sidebar;
