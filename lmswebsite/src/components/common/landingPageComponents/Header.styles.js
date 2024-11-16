import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: #fff;
  padding: 0px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: 80px;
  height: auto;
`;

export const MenuIcon = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Hamburger = styled.div`
  width: 25px;
  height: 2px;
  background-color: #000;
  position: relative;
  transition: all 0.3s ease;

  &::before,
  &::after {
    content: '';
    width: 25px;
    height: 2px;
    background-color: #000;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::before {
    transform: translateY(-8px);
  }

  &::after {
    transform: translateY(8px);
  }

  &.open {
    background-color: transparent;

    &::before {
      transform: rotate(45deg);
      top: 0;
    }

    &::after {
      transform: rotate(-45deg);
      top: 0;
    }
  }
`;

export const NavMenu = styled.nav`
  display: flex;

  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    align-items: center;
    width: 100%;

    &.open {
      display: flex;
    }
  }
`;

export const NavLinks = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const NavLinkItem = styled.li`
  margin-right: 20px;
  position: relative;

  a {
    text-decoration: none;
    font-size: 16px;
    color: #000;
    transition: color 0.3s ease;

    &:hover {
      color: #ff0080;
    }
  }
`;

export const DropdownContent = styled.ul`
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1;
  min-width: 150px;
  list-style-type: none;
  margin: 0;

  li {
    padding: 10px 20px;

    a {
      color: #000;
      transition: color 0.3s ease;

      &:hover {
        color: #ff0080;
      }
    }
  }
`;

export const AuthButtons = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SignInButton = styled.button`
  border: 2px solid #000;
  background-color: transparent;
  color: #000;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 4px;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

export const SignUpButton = styled.button`
  background-color: #ff0080;
  color: white;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 4px;

  &:hover {
    background-color: #e60073;
  }
`;
