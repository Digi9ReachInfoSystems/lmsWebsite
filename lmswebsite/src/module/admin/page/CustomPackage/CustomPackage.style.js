// CustomPackage.style.js
import styled from 'styled-components';

import {media,theme} from "../../../../style/theme/theme"

export const Container = styled.div`
  padding: 20px;
  background-color: #fff;

  .ant-table {
    margin-top: 20px;
  }

  h2{
  font-family: ${theme.typography.fontFamily};
  font-size: 1.8rem;
  font-weight: bold;
  color: ${theme.colors.black};
  margin-bottom: 30px;
  }
`;

export const StyledModal = styled.div`

  .ant-modal-content {
    border-radius: 8px;
  }

  .ant-modal-header {
    background-color: #f0f2f5;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    padding: 16px 24px;
  }

  .ant-modal-title {
  // font-family: ${theme.typography.fontFamily};
    font-size: 18px;
    font-weight: 600;
  }

  .ant-modal-body {
    padding: 24px;
    
  }

  .ant-modal-footer {
    border-top: none;
    padding: 10px 16px;
    
  }
`;

export const StyledForm = styled.div`
  .ant-form-item {
    margin-bottom: 16px;
  }

  .ant-form-item-label > label {
    font-weight: 500;
  }

  .ant-input[disabled] {
    background-color: #f5f5f5;
    color: rgba(0, 0, 0, 0.85);
  }

  .ant-input-textarea[disabled] {
    background-color: #f5f5f5;
    color: rgba(0, 0, 0, 0.85);
  }
`;


