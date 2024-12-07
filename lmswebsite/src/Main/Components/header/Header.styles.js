// Header.style.js
import styled from "styled-components";
import { theme, media } from "../../../style/theme/theme";

export const HeaderContainer = styled.header`
  background-color: ${theme.colors.black};
  padding: 10px 20px;
  color: ${theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 9rem;

  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensures header is above other components */
`;

export const Logo = styled.div`
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .logo-icon {
    height: 50px;
    width: auto;

    ${media.sm`
      height: 40px;
    `}
  }
`;

export const NavMenu = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.sm`
    display: none; /* Hide on small screens */
  `}
`;

export const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 40px;
  margin: 0;
  padding: 0;

  > li {
    position: relative; /* Allows absolute positioning of dropdowns */
  }

  a {
    color: ${theme.colors.white};
    text-decoration: none;
    font-weight: 500;
    padding: 10px;
    display: block;

    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

export const DropdownWrapper = styled.li`
  position: relative; /* Establishes a positioning context */

  /* Boards Menu */
  .boards-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: ${theme.colors.black};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 10px 0;
    min-width: 160px;
    z-index: 1000;
    display: block;
  }

  /* Hide nested menus by default */
  .boards-menu .classes-menu,
  .classes-menu .packages-menu {
    display: none;
  }

  /* Show Classes Menu on hover of Boards */
  .boards-menu li:hover > .classes-menu {
    display: block;
  }

  /* Show Packages Menu on hover of Classes */
  .classes-menu li:hover > .packages-menu {
    display: block;
  }

  /* Classes Menu */
  .classes-menu {
    position: absolute;
    top: 0;
    left: 100%;
    background-color: ${theme.colors.black};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 10px 0;
    min-width: 160px;
    z-index: 1000;
  }

  /* Packages Menu */
  .packages-menu {
    position: absolute;
    top: 0;
    left: 100%;
    background-color: ${theme.colors.black};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 10px 0;
    min-width: 160px;
    z-index: 1000;
  }

  /* Styles for Boards Links */
  .boards-menu > li > a {
    color: ${theme.colors.white};
    padding: 8px 16px;
    display: block;

    &:hover {
      background-color: ${theme.colors.darkred};
      color: ${theme.colors.white};
    }
  }

  /* Styles for Classes Links */
  .classes-menu > li > a {
    color: ${theme.colors.white};
    padding: 8px 16px;
    display: block;

    &:hover {
      background-color: ${theme.colors.darkred};
      color: ${theme.colors.white};
    }
  }

  /* Styles for Packages Links */
  .packages-menu > li > a {
    color: ${theme.colors.white};
    padding: 8px 16px;
    display: block;

    &:hover {
      background-color: ${theme.colors.darkred};
      color: ${theme.colors.white};
    }
  }
`;

// Hamburger Icon for Mobile View
export const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;

  span {
    display: block;
    height: 2px;
    width: 24px;
    background-color: ${theme.colors.white};
  }

  ${media.sm`
    display: flex;
  `}
`;

// Mobile Navigation Menu
export const MobileMenu = styled.div`
  display: none;

  ${media.sm`
    display: block;
    position: absolute;
    top: 60px; /* Adjust based on header height */
    left: 0;
    width: 100%;
    background-color: ${theme.colors.backgroundDark};
    padding: 10px 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 999; /* Ensures mobile menu is above other content */
  `}

  ${NavLinks} {
    flex-direction: column;
    gap: 10px;

    li {
      text-align: left;
    }

    a {
      color: ${theme.colors.white};
      padding: 10px 0;

      &:hover {
        color: ${theme.colors.primary};
      }
    }
  }
`;

// Logout Button
export const SignUpButton = styled.button`
  background-color: #ff0080;
  color: white;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #e60073;
  }

  ${media.sm`
    display: none; /* Hide on small screens if needed */
  `}
`;
