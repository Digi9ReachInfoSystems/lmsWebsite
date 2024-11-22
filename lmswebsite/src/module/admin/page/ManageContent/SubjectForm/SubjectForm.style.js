// SubjectForm.style.js

import styled from "styled-components";
import { media, theme } from "../../../../../style/theme/theme";

export const FormContainer = styled.div`
  background-color: ${theme.colors.white};
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto; /* Center the form horizontally */

  h2 {
    text-align: center;
    color: ${theme.colors.primary}; /* Using theme color */
    margin-bottom: 30px;
    font-size: 1.8rem;
    font-family: ${theme.typography.fontFamily};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Responsive Design */
  ${media.sm`
    padding: 20px;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
  `}
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.5em;
  border: 1px solid ${theme.colors.black};
  border-radius: 4px;
  font-size: 1rem;
  font-family: ${theme.typography.fontFamily};
  color: ${theme.colors.black};
  margin-bottom: 1em;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 5px ${theme.colors.primary};
  }

  

  ${media.sm`
    font-size: 0.9rem;
  `}

  ${media.xs`
    font-size: 0.8rem;
  `}
`;

export const FormContext = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const Button = styled.button`
  background-color: ${theme.colors.pink};
  color: ${theme.colors.white};
  padding: 0.7em 1.5em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-family: ${theme.typography.fontFamily};
  transition: background-color 0.3s;

 
  &:disabled {
    background-color: ${theme.colors.gray700};
    cursor: not-allowed;
  }

  ${media.sm`
    width: 100%;
    padding: 0.6em 1.2em;
  `}

  ${media.xs`
    width: 100%;
    padding: 0.5em 1em;
  `}
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure the modal overlays other content */
`;

export const ModalContent = styled.div`
  position: relative;
  padding: 20px;
  background: ${theme.colors.white};
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${theme.colors.gray700};

  &:hover {
    color: ${theme.colors.pink};
  }
`;

export const label = styled.label`
  font-size: 1.1rem;
  font-family: ${theme.typography.fontFamily};
  padding: 0.5em 0;
  
  font-weight: bold;
  color: ${theme.colors.pink};
`;  

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  color:${theme.colors.primary};
  gap: 8px;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color:${theme.colors.primary};
`;

export const Select = styled.select`
  flex: 1;
  padding: 0.5em;
  border: 1px solid ${theme.colors.primary};
  border-radius: 5px;
  font-size: 1rem;
  font-family: ${theme.typography.fontFamily};
  color: ${theme.colors.black};
  margin-bottom: 1em;

  option{
    background-color:${(props)=> (props.active ? theme.colors.pink : theme.colors.white)};
  }

  option:hover{
    background-color:${theme.colors.pink};
  }
  

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 5px ${theme.colors.primary};
  }

  ${media.sm` 
    font-size: 0.9rem;
  `}

  ${media.xs`
    font-size: 0.8rem;
  `}
`;