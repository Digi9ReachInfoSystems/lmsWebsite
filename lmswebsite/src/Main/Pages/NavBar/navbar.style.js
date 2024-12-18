import styled from "styled-components";
import { theme, media } from "../../../style/theme/theme";

export const StyledLink = styled.div`
  position: relative;
  z-index: 2;

  .dropdown-button {
    cursor: pointer;
    padding: 2px 5px;
    border: 1px solid #00a87d;
    border-radius: 8px;
    color: #00a87d;
    background-color: ${(props) =>
      props.isCoursesOpen ? "#00a87d" : "transparent"};
    color: ${(props) => (props.isCoursesOpen ? theme.colors.white : "#00a87d")};
    display: flex;
    align-items: center;
    // gap: 5px;

    &:hover {
      background-color: #00a87d;
      color: ${theme.colors.white};
    }

    .arrowicon {
      font-size: 14px;
      margin-left: 5px;

      &:hover {
        color: ${theme.colors.white};
      }
    }

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }

  /* Dropdown menu */
  .category-menu {
    display: ${(props) => (props.isCoursesOpen ? "block" : "none")};
    height: 300px;
    min-width: 150px;
    position: absolute;
    margin-top: 3px;
    cursor: pointer;
    border: 1px solid ${theme.colors.frenchGray};
    background: ${theme.colors.white};
    color: ${theme.colors.gray700};
    list-style: none;

    .categorylist {
      padding: 10px;
    }

    .category-item {
      height: 50px;
      padding: 10px;

      &:hover {
        background-color: #00a87d;
        color: ${theme.colors.white};
      }
    }

    .categorylink {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;

      &:hover {
        background-color: #00a87d;
        color: ${theme.colors.white};
      }
    }

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }

  /* Submenus */
  .boards-menu,
  .classes-menu,
  .packages-menu {
    height: 400px;
    min-width: 150px;
    position: absolute;
    top: -1px;
    left: 100%;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.frenchGray};
    list-style: none;
    padding: 10px 0;
    z-index: 1000;

    li > a {
      color: ${theme.colors.gray700};
      padding: 8px 16px;
      display: block;

      &:hover {
        background-color: #00a87d;
        color: ${theme.colors.white};
      }
    }
  }

  .boards-menu .classes-menu,
  .classes-menu .packages-menu {
    display: none;
  }

  .boards-menu li:hover > .classes-menu,
  .classes-menu li:hover > .packages-menu {
    display: block;
  }

  /* Media Queries for Responsive Design */
  @media (max-width: 1400px) {
    .category-menu {
      height: 400px;
    }
  }

  @media (max-width: 1200px) {
    .dropdown-button {
      padding: 4px 8px;
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    .dropdown-button {
      font-size: 10px;
      padding: 3px 6px;
    }
    .category-menu {
      /* display: block; */
      position: static;
      height: auto;
    }
  }

  @media (max-width: 576px) {
    .dropdown-button {
      padding: 2px 4px;
      font-size: 10px;
    }

    .boards-menu {
      height: 400px;
      min-width: 100px;
      top: 25px;
    }
    .classes-menu,
    .packages-menu {
      height: 400px;
      min-width: 100px;
    }

    li > a {
      font-size: 10px;
    }

    .categorylink {
      font-size: 10px;
    }

    .category-menu {
      height: 400px;
      min-width: 100px;
    }
  }

  @media (max-width: 480px) {
    .dropdown-button {
      width: 100%;
      text-align: center;
      border-radius: 4px;
    }
  }
`;

export const StyledBox = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 576px) {
    display: ${(props) => (props.isMenuOpen ? "flex" : "none")};
    flex-direction: column;
    align-items: flex-start;
    background-color: #fff;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    padding: 10px;
    z-index: 1000;

    a {
      color: #333;
      padding: 8px 10px;
      &:hover {
        color: #00a87d;
      }
    }
  }
`;

export const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;

  span {
    display: block;
    height: 2px;
    width: 24px;
    background-color: #333;
  }

  @media (max-width: 576px) {
    display: flex;
  }
`;
