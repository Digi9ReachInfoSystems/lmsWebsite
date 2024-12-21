import styled from "styled-components";
import { media, theme } from "../../../../style/theme/theme";

export const Container = styled.div`
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    ${media.md `    
      flex-direction: column;
      gap: 10px;
        `}

    ${media.sm `
      flex-direction: column;
      gap: 10px;
        `}

        ${media.xs `
      flex-direction: column;
      gap: 10px;
        `}

    h2 {
      font-family: ${theme.typography.fontFamily};
      font-size: 1.8rem;
      font-weight: bold;
      color: ${theme.colors.frenchGray};

      ${media.md `
        font-size: 1.5rem;
        `}

      ${media.sm `
        font-size: 1.3rem;
        `}

        ${media.xs `
        font-size: 1.2rem;
        `}
    }
  }

  .ant-table {
    margin-top: 20px;

    ${media.md `
      margin-top: 10px;
    `}
    ${media.sm `
      margin-top: 10px;
    `}
    ${media.xs `
      margin-top: 10px;
    `}
  }
`;

export const SearchContainer = styled.div`
  max-width: 300px;
  width: 100%;
${media.md`
  max-width: 100%;
  margin-top: 1em;
  `}
  ${media.sm` 
  max-width: 100%;
  margin-top: 1em;
  `}
${media.xs `
  max-width: 100%;
  margin-top: 1em;
  `}

  .ant-input {
    border-radius: 5px;

    ${media.md`
      border-radius: 5px;
    `}
    ${media.sm`
      border-radius: 5px;
    `}
    ${media.xs`
      border-radius: 5px;
    `}
  }
`;

export const StyledModal = styled.div`
  .ant-modal-content {
    border-radius: 8px;

    ${media.md`
      border-radius: 8px;
    `}
    ${media.sm`
      border-radius: 8px;
    `}
    ${media.xs`
      border-radius: 8px;
    `}  
  }
`;

export const StyledForm = styled.div`
  .ant-form-item {
    margin-bottom: 16px;
    padding-left: 10px; /* Add left padding */

    ${media.md`
      margin-bottom: 16px;
    `}
    ${media.sm`
      margin-bottom: 16px;
    `}
    ${media.xs`
      margin-bottom: 16px;
    `}
  }

  .ant-form-item-label > label {
    font-weight: 500;

    ${media.md`
      font-size: 14px;
    `}
    ${media.sm`
      font-size: 14px;
    `}
    ${media.xs`
      font-size: 14px;
    `}
  }


`;
