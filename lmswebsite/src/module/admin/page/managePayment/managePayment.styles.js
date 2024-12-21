// ManagePayment.styles.js
import styled from "styled-components";
import { Button } from "antd";
import { media, theme } from "../../../../style/theme/theme"; // Adjust the path as needed

export const Container = styled.div`
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    ${media.md`    
      flex-direction: column;
      gap: 10px;
      `}

    ${media.sm`
      flex-direction: column;
      gap: 10px;
      `}

      ${media.xs`
      flex-direction: column;
      gap: 10px;
      `}

    h2 {
      font-family: ${theme.typography.fontFamily};
      font-size: 1.8rem;
      font-weight: bold;
      color: ${theme.colors.frenchGray};

      ${media.sm`
        font-size: 1.5rem;
      `}

      ${media.xs`
        font-size: 1.2rem;
      `}
      ${media.md`
        font-size: 1.5rem;
      `}
    }

    .actions {
      display: flex;
      gap: 16px;

      .ant-input {
        border-radius: 4px;
        height: 40px;
        
        ${media.md`
          border-radius: 4px;
        `}
        ${media.sm`
          border-radius: 4px;
        `}
        ${media.xs`
          border-radius: 4px;
        `}
      }

      .ant-btn {
        height: 40px;
        display: flex;
        align-items: center;

        ${media.md`
          border-radius: 4px;
        `}
        ${media.sm`
          border-radius: 4px;
        `}
        ${media.xs`
          border-radius: 4px;
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

  .ant-table-thead > tr > th {
    background-color: #fafafa;
    font-weight: bold;
  }

  .ant-table-tbody > tr > td {
    vertical-align: middle;
  }

  .ant-table-pagination {
    margin-top: 20px;
    text-align: right;
  }
`;

export const StyledButton = styled(Button)`
  background-color: #ee1b7a;
  border-color: #ee1b7a;
  color: #fff;
${media.md`
  border-radius: 4px;
`}

${media.sm`
  border-radius: 4px;
  `}

${media.xs`
  border-radius: 4px;
  `}

  &:hover,
  &:focus {
    background-color: #d11766;
    border-color: #d11766;
    color: #fff;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;

  ${media.md`
  border-radius: 4px;
`}

${media.sm` 
  border-radius: 4px;
  `}

${media.xs`
  border-radius: 4px;
  `}

  &:hover,
  &:focus {
    background-color: #096dd9;
    border-color: #096dd9;
    color: #fff;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;

  ${media.md`
    height: 150px;
  `}

  ${media.sm`
    height: 100px;
  `}

  ${media.xs`
    height: 100px;
  `}
`;

export const ModalContent = styled.div`
  padding: 20px;

  ${media.md`
    padding: 10px;
  `}  

  ${media.sm`
    padding: 10px;
  `}

  ${media.xs`
    padding: 10px;
  `}

  .details {
    display: flex;
    flex-direction: column;
    gap: 10px;

    p {
      margin: 0;
    }

    .image-container {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 5px;
      }
    }
  }
`;
