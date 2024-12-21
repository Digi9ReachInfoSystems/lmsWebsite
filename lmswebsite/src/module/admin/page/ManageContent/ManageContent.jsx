import React, { useState } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
  Container,
  Header,
  TabsContainer,
  Tab,
  Title,
  HamburgerMenu,
  // HamburgerIcon,
} from "./ManageContent.style";

const ManageContent = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <Container>
      <Header>
        {/* <IoArrowBackCircleOutline size={30} onClick={handleBack} /> */}
        <Title>Manage Content</Title>
        <HamburgerMenu onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </HamburgerMenu>
      </Header>
      <TabsContainer isMenuOpen={isMenuOpen}>
        <Tab to="/admin/manageContent/">Class</Tab>
        <Tab to="subject">Subject</Tab>
        <Tab to="board">Board</Tab>
        <Tab to="package">Package</Tab>
        <Tab to="faq">FAQ's</Tab>
        <Tab to="banner">Banner</Tab>
        <Tab to="chooseUs">Choose Us</Tab>
        <Tab to="benefits">Benefits</Tab>
        <Tab to="typeOfBatch">Type Of Batch</Tab>
        <Tab to="blog">Blog</Tab>
      </TabsContainer>
      <Outlet />
    </Container>
  );
};

export default ManageContent;
