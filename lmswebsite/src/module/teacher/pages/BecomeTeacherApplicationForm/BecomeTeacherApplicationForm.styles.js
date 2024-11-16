import styled from "styled-components";
import { theme, media } from "../../../../style/theme/theme";

export const ApplicationContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  padding: 40px;
  background-color: ${theme.colors.backgroundLight};

  ${media.md`
    padding: 20px;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    background-color: ${theme.colors.backgroundLight};
  `}

  .applicationImage {
    text-align: center;

    .teacherformImage {
      width: 100%;
      height: 100%;
      border-radius: 8px;

      ${media.sm`
        max-width: 100%;
      `}
    }
  }

  .applicationDetails {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${theme.colors.white};
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;

    ${media.md`
      padding: 15px;
    `}

    ${media.sm`
      padding: 10px;
    `}
  }

  .applicationFormTitle {
    font-family: ${theme.typography.fontFamily};
    font-size: 2rem;
    font-weight: bold;
    color: ${theme.colors.primary};
    margin-bottom: 10px;
    text-align: center;

    ${media.md`
      font-size: 1.8rem;
    `}

    ${media.sm`
      font-size: 1.6rem;
    `}
  }

  .applicationFormSubtitle {
    font-size: 1.1rem;
    color: ${theme.colors.textSecondary};
    margin-bottom: 20px;
    text-align: center;

    ${media.md`
      font-size: 1rem;
    `}

    ${media.sm`
      font-size: 0.95rem;
    `}
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .applicationRowOne, .applicationRowTwo, .applicationRowThree {
    display: flex;
    gap: 20px;
    //  padding: 15px;
    margin-bottom: 15px; /* Apply margin-bottom to each row */

    ${media.sm`
      flex-direction: column;
      gap: 12px;
    `}
   
    

    input, select ,.react-select-container{
      padding: 10px;
      font-size: 1rem;
      border: 1px solid ${theme.colors.gray300};
      border-radius: 4px;
      width: 100%;
      color: ${theme.colors.textPrimary};
      background-color: ${theme.colors.white};

      &::placeholder {
        color: ${theme.colors.gray500};
      }
    }
  }

  button {
    padding: 12px;
    font-size: 1rem;
    font-weight: bold;
    color: ${theme.colors.red};
    background-color: ${theme.colors.primary};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${theme.colors.primaryDark};
    }

    &:disabled {
      background-color: ${theme.colors.gray500};
      cursor: not-allowed;
    }
  }
`;

export const UploadWrapper = styled.div`
  position: relative;
  width: 100%;

  .uploadLabel {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    font-size: 1rem;
    font-weight: bold;
    color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};
    border-radius: 4px;
    cursor: pointer;
    gap: 8px;
    background-color: ${theme.colors.white};

    .uploadIcon {
      font-size: 1.2rem;
    }
  }

  input[type="file"] {
    /* Visually hide the input */
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;


export const Processing = styled.div`
height: 30vh;
 display: ${({ visible }) =>{  return (visible ? 'block' : 'none')}};
font-family: ${theme.typography.fontFamily};
  font-size: 2rem;
  color: ${theme.colors.primary};
  text-align: center;
 padding-top:5%;
  margin-bottom: 20px;

  ${media.md`
    font-size: 1.8rem;
  `}

  ${media.sm`
    font-size: 1.6rem;
  `}

`;

// text-align: center;
// padding: 20px;
// font-size: 1.2rem;
// color: ${theme.colors.primary};

