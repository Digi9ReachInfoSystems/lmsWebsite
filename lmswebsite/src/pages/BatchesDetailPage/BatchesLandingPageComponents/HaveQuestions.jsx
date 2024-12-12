import React, { useState } from "react";
import { Modal } from "antd";

import {
  FAQQueryContainer,
  FAQQuerySection,
  FAQQueryDetails,
  FAQQueryTitle,
  FAQQuerySubtitle,
  FAQQueryButton,
} from "./HaveQuestions.style";
import QueryImage from "../../../Main/assets/Contactimage.jpeg";
import LandingPageContactUs from "../../../Main/Components/LandingPageContactUs/LandingPageContactUs";

const FAQSection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <FAQQueryContainer>
      <FAQQuerySection>
        <FAQQueryDetails>
          <FAQQueryTitle>Have a Question? Let’s ask</FAQQueryTitle>
          <FAQQuerySubtitle>
            If you are confused or in doubt, you can contact us for free. We
            will be happy to help.
          </FAQQuerySubtitle>
          <FAQQueryButton onClick={showModal}>Contact Us</FAQQueryButton>
        </FAQQueryDetails>
        <img src={QueryImage} alt="Query Image" />
      </FAQQuerySection>
      <Modal
        title="Contact Us"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <LandingPageContactUs onClose={handleCancel} />
      </Modal>
    </FAQQueryContainer>
  );
};

export default FAQSection;
