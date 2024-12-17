import styled from "styled-components"; // Ensure this import is at the top of your file
import { theme, media } from "../../../style/theme/theme"; // If you are using a theme or media query system

export const FAQQueryContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  width: 80%;
  color: #fff;
  margin-left: 10%;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

export const FAQQuerySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  color: #fff;

  width: 90%;
  border-radius: 20px;
  background-color: ${theme.colors.pink4};

  flex-direction: row;

  @media (max-width: 768px) {
    gap: 15px;
    padding: 15px;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 480px) {
    gap: 10px;
    padding: 10px;
  }

  img {
    width: 30%;
    height: auto;
    border-radius: 5px;

    @media (max-width: 990px) {
      max-width: 80%;
    }

    @media (max-width: 768px) {
      max-width: 70%;
    }

    @media (max-width: 480px) {
      max-width: 60%;
    }
  }
`;

export const FAQQueryDetails = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    flex: 2;
  }

  @media (max-width: 480px) {
    flex: 1;
  }
`;

export const FAQQueryTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-left: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const FAQQuerySubtitle = styled.p`
  font-size: 16px;
  color: #fff;
  margin-top: 10px;
  margin-left: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const FAQQueryButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1rem;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 20px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
`;
