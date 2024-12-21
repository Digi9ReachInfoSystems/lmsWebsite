// import styled from "styled-components";
// import { Menu as AntMenu } from "antd";
// import {theme} from "../../../../../style/theme/theme"

// export const StyledMenuItem = styled(AntMenu.Item)`
//   &.ant-menu-item-selected {
//     background-color: #ff007a !important; /* Pink background for selected items */
//     color: white !important; /* White text for contrast */
//   }

//   // &:hover {
//   //   background-color: #ff007a !important; /* Pink background on hover */
//   //   color: white !important; /* White text for contrast */
//   // }

//   &:focus {
//     background-color: #ff007a !important; /* Pink background on focus */
//     color: white !important; /* White text for contrast */
//   }
// `;

// export const Layout = styled.div`
// font-family: ${theme.typography.fontFamily};
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: ${theme.colors.gray100};
// `;









import styled from "styled-components";
import { Menu as AntMenu } from "antd";
import { theme } from "../../../../../style/theme/theme";

export const StyledMenuItem = styled(AntMenu.Item)`
  &.ant-menu-item-selected {
    background-color: #ff007a !important; /* Pink background for selected items */
    color: white !important; /* White text for contrast */
  }

  &:focus {
    background-color: #ff007a !important; /* Pink background on focus */
    color: white !important; /* White text for contrast */
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 14px; /* Smaller font size for medium screens */
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 12px; /* Even smaller font size for small screens */
  }
`;

export const Layout = styled.div`
  font-family: ${theme.typography.fontFamily};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${theme.colors.gray100};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 10px; /* Smaller padding on medium screens */
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 5px; /* Even smaller padding for small screens */
  }
`;

export const Sider = styled.div`
  @media (max-width: ${theme.breakpoints.md}) {
    display: none; /* Hide the sidebar on medium screens */
  }
`;

export const Content = styled.div`
  padding: 24px;
  background: #fff;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 15px; /* Smaller padding for medium screens */
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 10px; /* Even smaller padding for small screens */
  }
`;

export const StyledMenu = styled(AntMenu)`
  @media (max-width: ${theme.breakpoints.md}) {
    display: none; /* Hide the menu on medium screens */
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    display: none; /* Hide the menu on small screens */
  }
`;
