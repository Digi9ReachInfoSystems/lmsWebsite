import styled from "styled-components";

export const BenefitsSectionContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
    background-color: white;


  @media (max-width: 1280px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: 10px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 5px;
  }
`;

export const Title = styled.h1`
  margin-top: 50px;
  margin-left: 5%;

  @media (max-width: 768px) {
    margin-left: 0;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 1.5em;
  }
`;

export const SubTitle = styled.h2`
  margin-top: -5px;
  margin-left: 5%;

  @media (max-width: 768px) {
    text-align: center;
    margin-left: 0;
  }

  @media (max-width: 480px) {
    font-size: 1.2em;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const BenefitCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  background-color: #f9f9f9;
  transition: transform 0.2s;
  height: auto;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    max-width: 80%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

export const BenefitContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Dot = styled.div`
  color: #04cf70;
  font-size: 24px;
  margin-right: 10px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const BenefitTitle = styled.h3`
  color: #ff0080;
  margin-top: 10px;

  @media (max-width: 480px) {
    margin-top: 5px;
    font-size: 1em;
  }
`;

export const BenefitDescription = styled.p`
  color: #333;
  font-size: 0.9em;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

export const BenefitImage = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Image = styled.img`
  max-width: 70%;
  height: auto;

  @media (max-width: 480px) {
    max-width: 80%;
  }
`;
