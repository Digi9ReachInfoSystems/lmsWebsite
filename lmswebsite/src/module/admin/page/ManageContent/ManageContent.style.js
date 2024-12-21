import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { media, theme } from "../../../../style/theme/theme";
// Container for the entire page
export const Container = styled.div`
  // margin: 20px;
`;

// Header with the back icon and title
export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  ${media.md `
    flex-direction: column;
    gap: 10px;
  `}

  ${media.sm `
    flex-direction: column;
    gap: 10px;
  `}

  ${media.xs `
    flex-direction: column;
    gap: 10px;
  `}

  h2 {
    margin: 0;
    font-size: 24px;
    color: #333;

    ${media.md `
      font-size: 20px;
    `}  

    ${media.sm `
      font-size: 18px;
    `}

    ${media.xs `
      font-size: 16px;
    `}
  }

  svg {
    color: #555;
    cursor: pointer;

    &:hover {
      color: #000;
    }
  }
`;

export const title = styled.h2`
  font-family: ${theme.typography.fontFamily};
  font-size: 24px;
  // font-weight: bold;
  margin: 20px;
  color: ${theme.colors.frenchGray};
  flex: 1;

  ${media.md `
    font-size: 20px;
  `}

  ${media.sm `
    font-size: 18px;
  `}

  ${media.xs `
    font-size: 16px;
  `}
`;

export const BackIcon = styled.a`
  display: flex;
  align-items: center;
  gap: 8px; /* Spacing between the icon and the text */
  text-decoration: none;
  font-size: 18px;
  color: #555;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;

  ${media.md  `
    font-size: 16px;
  `}

  ${media.sm  `
    font-size: 14px;  
  `}

  ${media.xs  `
    font-size: 12px;  
  `}  

  &:hover {
    background-color: #f0f0f0;
    text-decoration: none;
  }
`;

// Tabs container
export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;

  ${media.md `
    flex-direction: column;
    gap: 10px;
  ` }

  ${media.sm `
    flex-direction: column;
    gap: 10px;
  `}

  ${media.xs `
    flex-direction: column;
    gap: 10px;
  `}
`;

// // Individual tab
// export const Tab = styled.a`
//   padding: 10px 20px;
//   font-size: 16px;
//   color: ${(props) => (props.active ? "#fff" : "#555")};
//   background-color: ${(props) => (props.active ? "#fa5a7d" : "transparent")};
//   border-right: 2px solid grey;
//   border-top: 2px solid grey;
//   border-radius: ${(props) => (props.active ? "8px" : "0")};
//   text-decoration: none;
//   cursor: pointer;

//   &:hover {
//     border-color: grey;
//     background-color: ${(props) => (props.active ? "pink" : "transparent")};
//   }

//   &:first-child {
//     border-left: 1px solid #ddd; /* Add border-left for the first tab */
//   }

//   &:active {
//     outline: none;
//   }
// `;

// Section where content is displayed
export const ContentSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;

 ${media.md `
    flex-direction: column;
    gap: 10px;
  `}

  ${media.sm `
    flex-direction: column;
    gap: 10px;
  `}
  ${media.xs `
    flex-direction: column;
    gap: 10px;
  `}
`;

export const Tab = styled(NavLink)`
  padding: 10px 20px;
  text-decoration: none;
  color: black;

  ${media.md `
    flex-direction: column;
    gap: 10px;
  `}

  ${media.sm `
    flex-direction: column;
    gap: 10px;
  `}

  ${media.xs `
    flex-direction: column;
    gap: 10px;
  `}

  &.active {
    font-weight: bold;
    border-bottom: 2px solid blue;
  }
  /* Other styles */
`;
