import styled from "styled-components";
import { theme } from "../../../../style/theme/theme";

export const Container = styled.div`
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      font-family: ${theme.typography.fontFamily};
      font-size: 1.8rem;
      font-weight: bold;
      color: ${theme.colors.black};
    }
  }

  .ant-table {
    margin-top: 20px;
  }
`;

export const SearchContainer = styled.div`
  max-width: 300px;
  width: 100%;

  .ant-input {
    border-radius: 5px;
  }
`;

export const StyledModal = styled.div`
  .ant-modal-content {
    border-radius: 8px;
  }
`;

export const StyledForm = styled.div`
  .ant-form-item {
    margin-bottom: 16px;
    padding-left: 10px; /* Add left padding */
  }

  .ant-form-item-label > label {
    font-weight: 500;
  }


`;
