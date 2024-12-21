 
import styled from "styled-components";
import { theme, media } from "../../../../../style/theme/theme";
 
export const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: ${theme.colors.white};
  border-radius: 8px;
  // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: ${theme.typography.fontFamily};

  ${media.sm`
    width: 100%;
  `}
 
  ${media.xs`
    width: 100%;
  `}
 
  ${media.md`
    width: 100%;
  `}
 
  h2 {
    text-align: center;
    margin-bottom: 20px;

    ${media.sm`
      width: 100%;
    `}
 
    ${media.xs`
      width: 100%;
    `}
 
    ${media.md`
      width: 100%;
    `}
  }
 
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    ${media.sm`
      width: 100%;
    `}
 
    ${media.xs`
      width: 100%;
    `}
 
    ${media.md`
      width: 100%;
    `}
  }
 
  label {
    // font-weight: bold;
    margin-bottom: 5px;
    display: block;
    font-family: ${theme.typography.fontFamily};

    ${media.sm`
      width: 100%;
    `}
 
    ${media.xs`
      width: 100%;
    `}
 
    ${media.md`
      width: 100%;
    `}
  }
 
  .ant-input,
  .ant-input-textarea {
    border: 1px solid ${theme.colors.primary};
    border-radius: 4px;
    font-size: 16px;

    ${media.sm`
      width: 100%;
    `}
 
    ${media.xs`
      width: 100%;
    `}
 
    ${media.md`
      width: 100%;
    `}
 
    &:focus {
      border-color: ${theme.colors.pink4};
      box-shadow: 0 0 5px ${theme.colors.pink4};
    }
  }
 
  .ant-btn-primary {
    background-color: ${theme.colors.pink4};
    border-color: ${theme.colors.pink4};
    font-family: ${theme.typography.fontFamily};

    ${media.sm`
      width: 100%;
    `}
 
    ${media.xs`
      width: 100%;
    `}
 
    ${media.md`
      width: 100%;
    `}
 
    &:hover {
      background-color: ${theme.colors.pink4} !important;
      border-color: white !important;
    }
  }
`;
 
export const StyledButton = styled.button`
  background-color: ${theme.colors.pink4};
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  width: 150px;
  height: 40px;
  display: block;
  margin: 20px auto 0;
  border-radius: 4px;
  text-align: center;
 
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
 
  ${media.sm`
    width: 100%;
  `}
 
  ${media.xs`
    width: 100%;
  `}
 
  ${media.md`
    width: 100%;
  `}
`;
 