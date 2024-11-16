import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 80%;
  margin: 0 auto 60px;
  background-color: #d95a81;
  height: 349px;
  color: white;
  padding: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;

  @media (max-width: 1200px) {
    width: 90%; /* Adjust width for laptop */
  }

  @media (max-width: 992px) {
    height: 280px; /* Adjust height for tablets */
    padding: 15px;
  }

  @media (max-width: 768px) {
    height: auto;
    width: 100%;
    padding: 20px 10px;
    margin: 0 auto 40px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 15px 5px;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Stack the content on mobile */
    text-align: center;
  }
`;

export const FooterText = styled.div`
  text-align: left;
  flex: 1;

  h2 {
    margin: 0;
    font-size: 28px;

    @media (max-width: 992px) {
      font-size: 24px; /* Font size for tablets */
    }

    @media (max-width: 768px) {
      font-size: 20px; /* Font size for mobile */
    }
  }

  p {
    margin: 5px 0;
    font-size: 18px;

    @media (max-width: 992px) {
      font-size: 16px; /* Font size for tablets */
    }

    @media (max-width: 768px) {
      font-size: 14px; /* Font size for mobile */
    }
  }
`;

export const FooterButton = styled.button`
  background-color: #01202b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e60073;
  }

  @media (max-width: 992px) {
    padding: 8px 18px; /* Smaller padding for tablets */
  }

  @media (max-width: 768px) {
    padding: 6px 16px; /* Smaller padding for mobile */
  }

  @media (max-width: 480px) {
    padding: 5px 15px; /* Even smaller padding for very small screens */
  }
`;

export const FooterImageWrapper = styled.div`
  height: 349px;
  text-align: right;
  margin-right: -20px;

  @media (max-width: 992px) {
    margin: 0 auto; /* Center image on tablets */
  }

  @media (max-width: 768px) {
    height: auto;
    width: 100%;
    text-align: center;
    margin: 10px 0 0;
  }
`;

export const FooterImage = styled.img`
  max-width: 100%;
  height: auto;

  @media (max-width: 768px) {
    width: 80%; /* Smaller image for mobile */
  }

  @media (max-width: 480px) {
    width: 70%; /* Even smaller image for very small screens */
  }
`;
