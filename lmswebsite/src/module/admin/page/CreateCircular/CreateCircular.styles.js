import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link here
import { theme, media } from "../../../../style/theme/theme";



export const CircularFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${theme.colors.white};
  padding: 20px;
  border-radius: 8px;


  ${media.md`
    padding: 1em;
  `}
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 1.1rem;
    font-weight: bold;
    color: ${theme.colors.textSecondary};
  }

  input[type="text"], input[type="date"], textarea {
    padding: 10px;
    border: 1px solid ${theme.colors.gray300};
    border-radius: 4px;
    font-size: 1rem;
    color: ${theme.colors.textPrimary};
  }

  .file-input {
  }

  .image-preview {
    width: 80px;
    height: 80px;
    margin-top: 8px;
    border-radius: 4px;
  }
`;

export const SubmitButton = styled.button`
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  color: ${theme.colors.black};
  background-color: ${theme.colors.pink3};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background-color: ${theme.colors.pink};
  }

  ${media.md`
    width: 100%;
  `}
`;

export const BackButton = styled(Link)`  /* Ensure Link is correctly used here */
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${theme.colors.primary};
  font-weight: bold;
  gap: 8px;
  margin-top: 20px;

  &:hover {
    color: ${theme.colors.primaryDark};
  }

  .icon {
    font-size: 1.2rem;
  }
`;
