import styled from "styled-components";

export const BenefitsSectionContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 1280px) {
    width: 90%;
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

export const SubTitle = styled.h1`
  margin-top: -5px;
  margin-left: 5%;

  @media (max-width: 768px) {
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 1.5em;
  }
`;

export const FlexContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const BenefitCard = styled.div`
  display: flex;
  width: 200%;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  transition: transform 0.2s;
  height: 140px;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1280px) {
    width: 100%;
    height: auto;
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px;
    height: auto;
    margin: 10px 0;
  }
`;

export const BenefitContent = styled.div`
  width: 40%;
  display: flex;
  gap: 20px;
  margin-top: -30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

export const Dot = styled.div`
  color: #04cf70;
  font-size: 200px;
  margin-top: -120px;

  @media (max-width: 1280px) {
    font-size: 150px;
  }

  @media (max-width: 480px) {
    font-size: 60px;
    margin-top: -40px;
  }
`;

export const BenefitTitle = styled.h3`
  color: #ff0080;
  margin-top: 60px;

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

export const BenefitDescription = styled.p`
  color: #333;
`;

export const BenefitImage = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-top: 20px;
  }
`;

export const Image = styled.img`
  max-width: 100%;
  height: auto;

  @media (max-width: 480px) {
    max-width: 80%;
  }
`;
