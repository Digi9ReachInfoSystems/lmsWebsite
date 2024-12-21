import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { media, theme } from "../../../../style/theme/theme";

// Container for the entire page
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

// Header with the back icon and title
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  ${media.md`
    flex-direction: row;
    gap: 10px;
    margin: 0 20px;
  `}
`;

export const Title = styled.h2`
  font-family: ${theme.typography.fontFamily};
  font-size: 24px;
  color: ${theme.colors.frenchGray};

  ${media.md`
    font-size: 20px;
    text-align: center;
  `}
`;

// Hamburger menu button
export const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;

  span {
    width: 25px;
    height: 3px;
    background-color: ${theme.colors.black};
    border-radius: 2px;
    transition: transform 0.3s ease;
  }

  ${media.md`
    display: flex;
  `}
`;

// Tabs container
export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;

  ${media.md`
    flex-direction: ${({ isMenuOpen }) => (isMenuOpen ? "column" : "row")};
    display: ${({ isMenuOpen }) => (isMenuOpen ? "flex" : "none")};
    
  `}
`;

// Individual tab
export const Tab = styled(NavLink)`
  padding: 10px 20px;
  text-decoration: none;
  color: ${theme.colors.black};
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s ease;

  &.active {
    font-weight: bold;
    border-bottom: 2px solid blue;
  }

  &:hover {
    color: ${theme.colors.blue};
  }

  ${media.md`
    text-align: left
    ;
  `}
`;
