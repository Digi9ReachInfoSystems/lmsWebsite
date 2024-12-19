// src/components/SignUpPage/SignUpPage.style.js

import styled from "styled-components";
import { theme, media } from "../../style/theme/theme"; // Adjust the path as needed

export const Container = styled.div`
  display: flex;
  justify-content: center;
  // align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  box-sizing: border-box;

  @media (max-width: 990px) {
    flex-direction: row;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const Heading = styled.div`
  font-family: ${theme.typography.fontFamily};
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

export const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: fit;
  }

  @media (max-width: 990px) {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

export const FormSection = styled.div`
  flex: 1;
  background: white;
  padding: 7vh 3vw;
  // border-radius: 20px;
  width: 100vw;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  @media (max-width: 990px) {
    padding: 8vh 3vw;
  }

  @media (max-width: 768px) {
    padding: 5vh 3vw;
    height: auto;
    margin-bottom: 3vh;
  }

  @media (max-width: 480px) {
    padding: 5vh 3vw;
    height: auto;
    margin-bottom: 2vh;
  }
`;

export const ScrollableForm = styled.div`
  width: 28vw;
  max-height: 75vh;
  overflow-y: auto;
  padding-right: 10px;

  /* Customize scrollbar for Webkit browsers */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
export const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  // color: #ee1b7a;
`;

export const LinkText = styled.a`
  // color: ${(props) => props.theme.colors.green};
  color:#00c897;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;
