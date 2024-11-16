// src/SettingsPage/SettingTabs.style.js
import styled from "styled-components";
import { media,theme } from "../../../../../style/theme/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  width: 100%; /* Set width for sidebar */

  @media (max-width: 1100px) {
    width: 100%; /* Adjust sidebar width on medium screens */
  }

  @media (max-width: 768px) {
    width: 100%; /* Full width for sidebar on smaller screens */
    flex-direction: column; /* Arrange sidebar items vertically */
    padding: 10px; /* Reduce padding */
    gap: 15px; /* Adjust spacing for smaller screens */
    display: ${(props) =>
      props.isSidebarVisible ? "flex" : "none"}; /* Toggle visibility */
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width for sidebar */
    flex-direction: column; /* Stack sidebar items vertically */
    gap: 10px; /* Further reduce gap for very small screens */
  }
`;

export const SidebarIcon = styled.span`
  margin-right: 10px;
`;

export const Content = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #f9f9f9;

  @media (max-width: 990px) {
    padding: 20px; /* Reduce padding on medium screens */
  }

  @media (max-width: 768px) {
    padding: 15px; /* Reduce padding further on small screens */
    margin-top: 10vh;
  }

  @media (max-width: 480px) {
    padding: 10px; /* Minimize padding on extra small screens */
  }
`;

export const Title = styled.h3`
  // margin-bottom: 20px;
  font-size: 20px!important;
  font-weight: 500;

  @media (max-width: 990px) {
    font-size: 8px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const SidebarItem = styled.div`
  justify-content: flex-start;
  margin-right: 0;
  padding: 10px 10px;
  cursor: pointer;
  height: 40px;
  font-size: 18px!important;
  font-weight: 600;
   
  border-top-right-radius: ${(props) => (props.active ? "0" : "8px!important")};

  /* Dynamic border styles based on active state */
  border-top: ${(props) =>
    props.active ? "transparent" : "3px solid #bdc9d3"};
  border-right: ${(props) =>
    props.active ? "transparent" : "3px solid #bdc9d3"};

  /* Dynamic text color */
  color: ${(props) => (props.active ? "#fff!important" : "#000")};

  /* Dynamic background and border radius */
  border-radius: ${(props) => (props.active ? "8px" : "0")};
  background-color: ${(props) => (props.active ? "#fa5a7d" : "transparent")};

  /* Hover styles */
  &:hover {
    border: ${(props) => (props.active ? "transparent" : "3px solid #bdc9d3")};
    margin: 0 10px;
    border-radius: 8px;
    color: #000; /* Ensures hover text color remains consistent */
  }

  /* Responsive styles for smaller screens */
  @media (max-width: 768px) {
    border: ${(props) => (props.active ? "3px solid #bdc9d3" : "none")};
    text-align: center;
  }

  @media (max-width: 480px) {
    text-align: center;
  }
`;

export const HamburgerMenu = styled.div`
  display: none;
  align-items: center;
  padding: 10px;
  width: 100%; /* Full width of container */

  @media (max-width: 768px) {
    display: flex; /* Display the hamburger menu on screens smaller than 768px */
    justify-content: space-between; /* Space out h3 and lines */
  }

  h3 {
    margin: 3vw;
    font-size: 24px;
    font-weight: 500;
    color: #333;
  }

  /* Styling for the hamburger lines container */
  .hamburger-lines {
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* Align lines to the right */
    gap: 4px; /* Space between lines */
  }

  .hamburger-lines div {
    height: 4px;
    width: 25px;
    background-color: #333;
    border-radius: 2px;
  }
`;
