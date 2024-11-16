import styled from "styled-components";

export const WhySection = styled.div`
  padding: 50px;
  text-align: center;
  width: 80%;
  margin-left: 10%;
    background-color: white;


  @media (max-width: 768px) {
    width: 90%;
    margin-left: 5%;
    padding: 30px;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 20px;
  }
`;

export const WhyHeading = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 60px;
    height: 4px;
    background-color: #ff0080;
    margin: 10px auto;
  }

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

export const WhyFeatures = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 40px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin: 30px 0;
  }
`;

export const FeatureItem = styled.div`
  text-align: center;
  width: 22%;

  @media (max-width: 768px) {
    width: 60%;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    width: 80%;
  }
`;

export const FeatureIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FeatureIcon = styled.img`
  width: 50px;
  height: 50px;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

export const HighlightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 50px;
  margin-top: 50px;
  border-radius: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const HighlightContent = styled.div`
  line-height: 1.6;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const HighlightButton = styled.button`
  background-color: #f94874;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 16px;
  width: 230px;

  &:hover {
    background-color: #e60073;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    width: 200px;
  }
`;

export const HighlightImage = styled.div`
  img {
    width: 430px;
    border-radius: 12px;

    @media (max-width: 768px) {
      width: 300px;
    }

    @media (max-width: 480px) {
      width: 100%;
    }
  }
`;

export const HighlightSubtext = styled.p`
  font-size: 16px;
  font-style: italic;
  color: #666;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const HighlightDescription = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
