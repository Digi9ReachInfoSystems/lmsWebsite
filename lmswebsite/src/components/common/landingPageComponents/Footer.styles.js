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
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
`;

export const FooterText = styled.div`
  text-align: left;
  flex: 1;

  h2 {
    margin: 0;
    font-size: 28px;
  }

  p {
    margin: 0;
    font-size: 18px;
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
`;

export const FooterImageWrapper = styled.div`
  height: 349px;
  text-align: right;
  margin-top: 16px;
  margin-right: -20px;
`;

export const FooterImage = styled.img`
  max-width: 100%;
  height: auto;
`;
