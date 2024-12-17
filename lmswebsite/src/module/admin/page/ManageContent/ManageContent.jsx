// ManageContent.jsx
import React, { useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
  Container,
  Header,
  TabsContainer,
  Tab,
  title,
} from "./ManageContent.style";

const ManageContent = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  // useEffect(() => {
  //   navigate("class");
  // }, [useEffect]);

  return (
    <Container>
      <Header>
        {/* <IoArrowBackCircleOutline size={30} onClick={handleBack} /> */}
        <title>Manage Content</title>
      </Header>
      <TabsContainer>
        <Tab to="/admin/manageContent/" as={NavLink}>
          Class
        </Tab>
        <Tab to="subject" as={NavLink}>
          Subject
        </Tab>
        <Tab to="board" as={NavLink}>
          Board
        </Tab>
        <Tab to="package" as={NavLink}>
          Package
        </Tab>
        <Tab to="faq" as={NavLink}>
          FAQ's
        </Tab>
        <Tab to="banner" as={NavLink}>
          Banner
        </Tab>
        <Tab to="chooseUs" as={NavLink}>
          Choose Us
        </Tab>

        <Tab to="benefits" as={NavLink}>
          Benefits
        </Tab>
        <Tab to="typeOfBatch"  as={NavLink}>
          Type Of Batch
        </Tab>
      </TabsContainer>
      <Outlet />
    </Container>
  );
};

export default ManageContent;
