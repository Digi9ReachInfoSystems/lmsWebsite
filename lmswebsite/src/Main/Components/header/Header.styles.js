import styled from "styled-components";
import { theme, media } from "../../../style/theme/theme";

export const HeaderContainer = styled.header`
  background-color: ${theme.colors.white};

  color: ${theme.colors.black};
  display: flex;
  justify-content: space-between;
  padding: 10px 0px 0px 0px;
  align-items: center;
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
    height: 70px;
    width: 80px;
    margin-left: 10em;

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

export const DropdownWrapper = styled.li`
  position: relative; /* Establishes a positioning context */

  .dropdown-button {
    cursor: pointer;
    padding: 2px 5px;
    border: 1px solid ${theme.colors.pink4};
    border-radius: 8px;
    color: ${theme.colors.pink4};
    margin-bottom: 20px;
    background-color: ${(props) =>
      props.isCoursesOpen ? props.theme.colors.pink4 : "transparent"};
    color: ${(props) =>
      props.isCoursesOpen ? "white" : "pink4"}; /* Change font color here */
    // color: ${(props) =>
      props.isCoursesOpen ? props.theme.colors.white : "transparent"};
    &:hover {
      background-color: ${theme.colors.pink4};
      color: ${theme.colors.white};
    }
  }

  .arrowicon {
    font-size: 14px;
    margin-left: 5px;

    &:hover {
      color: ${theme.colors.white};
    }
  }

  .category-menu {
    display: ${(props) => (props.isCoursesOpen ? "block" : "none")};
    // overflow-y: auto;
    height: 400px;
    min-width: 200px;
    position: absolute;
    // padding: 20px;
    gap: 60px;
    margin-top: 3px;

    cursor: pointer;
    border: 1px solid ${theme.colors.frenchGray};
    // border-radius: 8px;
    background: ${theme.colors.white};
    color: ${theme.colors.gray700};

    .category-item {
      height: 50px;
      padding: 1px;
      // margin-top: 20px;

      &:hover {
        // margin-top: -20px;
        // background-color: ${theme.colors.pink4};
        color: ${theme.colors.white};
        background-color: ${(props) => props.theme.colors.pink4};
      }
    }
  }

  .categorylink {
    margin: 10px;
    display: flex;
    gap: 20px;
    width: 30px;
    height: 30px;
    // &:hover {
    //   color: ${theme.colors.pink4};

    // }
  }

  /* Boards Menu */
  .boards-menu {
    height: 400px;
    min-width: 200px;
    position: absolute;
    top: -1px;
    left: 100%;
    // border-radius: 8px;

    background-color: ${theme.colors.white};
    // box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border: 1px solid ${theme.colors.frenchGray};
    list-style: none;
    padding: 10px 0;
    min-width: 160px;
    z-index: 1000;
    display: block;

    &:hover {
      color: ${theme.colors.pink4};
    }
  }

  /* Hide nested menus by default */
  .boards-menu .classes-menu,
  .classes-menu .packages-menu {
    display: none;
  }

  /* Show Classes Menu on hover of Boards */
  .boards-menu li:hover > .classes-menu {
    display: block;
    color: ${theme.colors.black};
  }

  /* Show Packages Menu on hover of Classes */
  .classes-menu li:hover > .packages-menu {
    display: block;
  }

  /* Classes Menu */
  .classes-menu {
    // overflow-y: auto;

    height: 400px;
    min-width: 200px;
    position: absolute;
    top: -1px;

    left: 100%;
    // border-radius: 8px;

    background-color: ${theme.colors.white};
    // box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border: 1px solid ${theme.colors.frenchGray};
    list-style: none;
    padding: 10px 0;
    min-width: 160px;
    z-index: 1000;

    &:hover {
      color: ${theme.colors.pink4};
    }
  }

  /* Packages Menu */
  .packages-menu {
    height: 400px;
    min-width: 200px;
    position: absolute;
    top: -1px;
    left: 100%;
    // border-radius: 8px;

    background-color: ${theme.colors.white};
    // box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border: 1px solid ${theme.colors.frenchGray};
    list-style: none;
    padding: 10px 0;
    min-width: 160px;
    z-index: 1000;

    &:hover {
      color: ${theme.colors.pink4};
    }
  }

  /* Styles for Boards Links */
  .boards-menu > li > a {
    color: ${theme.colors.gray700};
    padding: 8px 16px;
    display: block;

    &:hover {
      background-color: ${theme.colors.pink4};
      color: ${theme.colors.white};
    }
  }

  /* Styles for Classes Links */
  .classes-menu > li > a {
    color: ${theme.colors.gray700};
    padding: 8px 16px;
    display: block;

    &:hover {
      background-color: ${theme.colors.pink4};
      color: ${theme.colors.white};
    }
  }

  /* Styles for Packages Links */
  .packages-menu > li > a {
    color: ${theme.colors.gray700};
    padding: 8px 16px;
    display: block;

    &:hover {
      background-color: ${theme.colors.pink4};
      color: ${theme.colors.white};
    }
  }
`;

// Hamburger Icon for Mobile View
export const HamburgerMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;

    svg {
      font-size: 24px;
      color: ${(props) => props.theme.colors.black};
    }
  }
`;
// Mobile Navigation Menu
export const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: ${(props) => props.theme.colors.black};
    text-decoration: none;
    font-size: 16px;
    padding: 10px 0;
    display: block; /* Ensures items take up full width */
    border-bottom: 1px solid #f0f0f0; /* Adds a separator between menu items */

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;
export const NavLinks = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 0;
  display: flex;
  flex-direction: row; /* Default: Horizontal layout for larger screens */
  gap: 60px; /* Adds spacing between items */

  li {
    text-align: left;

    a {
      color: ${(props) => props.theme.colors.black};
      font-size: 16px;
      text-decoration: none;

      &:hover {
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }

  /* Media Query for Small Screens */
  @media (max-width: 768px) {
    flex-direction: column; /* Makes items vertical on small screens */
    gap: 15px;

    li {
      padding: 10px 0;
    }
  }
`;

// Logout Button
export const SignUpButton = styled.button`
  background-color: #ff0080;
  color: white;
  padding: 10px 20px;
  margin-right: 2em;
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
export const SignUpButton1 = styled.button`
  background-color: #ff0080;
  color: white;
  padding: 10px 20px;
  margin-right: 10em;
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
