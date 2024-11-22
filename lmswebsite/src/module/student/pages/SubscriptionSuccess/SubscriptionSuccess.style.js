import { theme } from "../../../../style/theme/theme";
import styled from "styled-components";

// Styled Components for styling the success message
export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${theme.colors.white}; // Corrected to theme's white color
  text-align: center;
  padding: 20px;

  /* Media query for tablets and smaller screens */
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 15px;
  }

  /* Media query for mobile devices */
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 10px;
  }
`;

export const SuccessMessage = styled.h2`
  font-size: 24px;
  color: ${theme.colors.pink4}; // Using pink4 from theme for success message
  margin-bottom: 20px;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 20px;
    margin-bottom: 15px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const PackageName = styled.p`
  font-size: 18px;
  color: ${theme.colors.gray700}; // Using gray700 for text color from theme
  margin-bottom: 30px;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 16px;
    margin-bottom: 20px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 14px;
    margin-bottom: 15px;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${theme.colors.pink4}; // Primary pink color from theme
  color: ${theme.colors.white}; // White color for text
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.pink3}; // Hover color from theme
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 8px 16px;
    font-size: 14px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;
