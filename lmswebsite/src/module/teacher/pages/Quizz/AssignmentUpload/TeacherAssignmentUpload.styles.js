import styled from "styled-components";

export const TeacherCircularWrap = styled.div`
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    input {
      width: 300px;
    }
  }

  .ant-input-affix-wrapper {
    width: 50%;
  }

  .tabs {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    gap: 10px;

    .ant-btn-primary {
      background-color: #1890ff;
      border-color: #1890ff;
    }

    .ant-btn-default {
      background-color: #f5f5f5;
      border-color: #d9d9d9;
    }
  }

  .ant-table {
    background-color: #fff;
  }

  .ant-modal-title {
    font-size: 1.5rem;
    text-align: center;
  }

  .ant-modal-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
