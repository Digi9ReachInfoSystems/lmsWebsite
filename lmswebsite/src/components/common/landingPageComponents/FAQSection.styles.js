import styled from "styled-components";

export const Section = styled.section`
  background-color: white;
  padding: 60px 20px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    font-size: 30px;
  }
  @media (max-width: 768px) {
    font-size: 28px;
  }
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const FAQList = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const FAQItem = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 20px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f2f2f2;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const QuestionText = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 18px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const ToggleIcon = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #ff0080;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.open ? "rotate(45deg)" : "rotate(0deg)")};

  @media (max-width: 1024px) {
    font-size: 22px;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const Answer = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #555;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const NoFAQsMessage = styled.p`
  color: #888;
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
`;
