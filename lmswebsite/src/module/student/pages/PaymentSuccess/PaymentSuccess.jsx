// PaymentSuccess.jsx

import React from "react";
// import { CheckCircleOutlined } from "@ant-design/icons";
import { FiCheckCircle } from "react-icons/fi";
import { LiaCheckCircleSolid } from "react-icons/lia";

import { Container, Message, ButtonContainer, Div } from "./PaymentSuccess.style";
import { Button } from "antd"; // Using Ant Design's Button component
import { useNavigate } from "react-router-dom";
import { theme } from "../../../../style/theme/theme";
const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate("/student/dashboard"); // Adjust the route as needed
  };

  return (
    <Container>
     <Div className="success-icon">
     {/* <CheckCircleOutlined
        style={{
          // fontSize: "64px",
          // color: theme.colors.newGreen,
          // backgroundColor: theme.colors.white,
         
          // marginBottom: "20px",
        }}
      /> */}
      < LiaCheckCircleSolid className="CheckCircleIcon" />
      </Div>
      <Message>Your payment was successful</Message>
      <p>Thank you for your payment! We are pleased to confirm that your transaction has been successfully processed.</p>
      <ButtonContainer>
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: theme.colors.newGreen }}
          onClick={handleGoToDashboard}
        >
          Go to My Dashboard
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default PaymentSuccess;
