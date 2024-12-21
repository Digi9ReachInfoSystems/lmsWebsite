import styled from "styled-components";
import { theme,media  } from "../../../../style/theme/theme";

export const Container = styled.div`

  padding: 20px;

  .header {
    display: flex;
    justify-content: center;
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
      font-size: 24px;
      // font-weight: bold;
      // margin: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: ${theme.colors.frenchGray};
      flex: 1;

      ${media.md `
        text-align: center;
      `}
      ${media.sm `
        text-align: center;
      `}
      ${media.xs `
        text-align: center;
      `}
    }

    .actions {
      display: flex;
      gap: 16px;

      .ant-input {
        border-radius: 4px;
        height: 30px;

        ${media.md `
          width: 100%;
        `}
        ${media.sm `
          width: 100%;
        `}
        ${media.xs `
          width: 100%;
        `}
      }

      .ant-btn {
        height: 40px;
        display: flex;
        align-items: center;

        ${media.md`
          width: 100%;
        `}
        ${media.sm`
          width: 100%;
        `}
        ${media.xs`
          width: 100%;
        `}
      }
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
  .ant-modal-close {
    top: 8px;
    right: 8px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #999;

    ${media.md` 
      font-size: 1rem;
    `}
    ${media.sm` 
      font-size: 0.9rem;
    `}
    ${media.xs` 
      font-size: 0.8rem;
    `}

    &:hover {
      color: #333;
    }
  }
`;
