import styled from "styled-components";
import { media, theme } from "../../../../style/theme/theme";

export const TeacherApplicationFormViewWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  background-color: ${theme.colors.backgroundLight};

  .status-button{
  padding: 10px 20px;
  background-color: ${theme.colors.pink4};
  border-radius: 4px;
  color: ${theme.colors.white};

  ${media.md`
    padding: 5px 10px;
  `}
  ${media.sm`
    padding: 5px 10px;
  `}
  ${media.xs`
    padding: 5px 10px;
  `}
  }

  .TeachersApplicationFormView-create{
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 0 1em;
  }

  .status-button:hover{
    background-color: ${theme.colors.pink3} !important;
    color: ${theme.colors.white} !important;
  }

  .area-row {
    display: flex;
    gap: 24px;

    ${media.md`
      flex-direction: column;
    `}

    ${media.sm`
      flex-direction: column;
    `}

    ${media.xs`
      flex-direction: column;
    `}

    &.ar-one {
      justify-content: space-between;
    }

    &.ar-two {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    &.ar-three {
      display: block;
    }

    ${media.md`
      flex-direction: column;
    `}
  }

  .TeachersApplicationFormView-batches_nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;
    margin: 0;

    ${media.md`
      flex-direction: column;
      align-items: stretch;
      // padding: 1em;
    `}

    ${media.sm,
    media.xs`
      flex-direction: column;
      align-items: stretch;
      // padding: 1em;
      `}


  }

  .TeachersApplicationFormView-batch_title {
    font-family: ${theme.typography.fontFamily};
    font-size: 24px;
    // font-weight: bold;
    margin: 20px;
    color: ${theme.colors.frenchGray};
    flex: 1;
    ${media.md`
      font-size: 20px;
    `}

    ${media.sm`
      font-size: 20px;
    `}

    ${media.xs`
      font-size: 20px;
    `}
  }

  .TeachersApplicationFormView-search {
    max-width: 320px;
    width: 100%;
    margin-right: 25px;

    ${media.md`
      max-width: 100%;
      margin-top: 1em;
    `}

    ${media.sm`
      max-width: 100%;
      margin-top: 1em;
    `}

    ${media.xs`
      max-width: 100%;
      margin-top: 1em;
    `}

    .ant-input-affix-wrapper {
      // border-radius: 6px;
      height: 40px;
      box-shadow: none;
      // border: 1px solid ${theme.colors.gray300};

      &:hover {
        border-color: ${theme.colors.gray700};
      }

      .ant-input {
        font-size: 15px;
        color: ${theme.colors.gray700};

        &::placeholder {
          color: ${theme.colors.gray500};
        }
      }

      .ant-input-prefix {
        color: ${theme.colors.gray500};
      }
    }
  }

  .TeachersApplicationFormView-filter {
    display: flex;
    align-items: center;
    gap: 10px;

    ${media.md`
      margin-top: 1em;
      justify-content: flex-start;
    `}

    ${media.sm`
      margin-top: 1em;
      justify-content: flex-start;
    `}

    ${media.xs`
      margin-top: 1em;
      justify-content: flex-start;
    `}

    .filter-dropdown {
      display: flex;
      align-items: center;
      // border-radius: 4px;
      padding: 5px;
      background-color: ${theme.colors.white};

      .filter-icon {
        font-size: 18px;
        color: ${theme.colors.gray700};
        margin-right: 8px;
      }

      .ant-select {
        width: 150px;
        .ant-select-selector {
          // border-radius: 4px !important;
          height: 40px;
          align-items: center;
          display: flex;
          background-color: ${theme.colors.white};
          // border: 1px solid ${theme.colors.gray300};

          &:hover {
            // border-color: ${theme.colors.gray500};
          }
        }
        .ant-select-selection-item {
          font-size: 14px;
          // color: ${theme.colors.gray700};
        }
      }
    }
  }

  .TeachersApplicationFormView-link {
    color: ${theme.colors.pink4};
    background: ${theme.colors.pink3};
    padding: 0.4em 1em;
    border: none;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
      background: ${theme.colors.pink5};
      color: ${theme.colors.white};
    }
  }

  .ant-table {
    background: ${theme.colors.white};
    border-radius: 8px;

    ${media.md`
      width: 100%;
      `}

    ${media.sm`
      width: 100%;
      `}

    ${media.xs`
      width: 100%;
      `}

    .ant-table-thead > tr > th {
      background: ${theme.colors.gray100};
      font-weight: bold;
      color: ${theme.colors.gray700};
      text-align: center;
    }

    .ant-table-tbody > tr > td {
      text-align: center;
      color: ${theme.colors.gray700};
      font-size: 14px;

      &:hover {
        background: ${theme.colors.gray50};
      }
    }
  }

  .ant-modal {
    .ant-modal-content {
      border-radius: 8px;
      overflow: hidden;

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
    .ant-modal-header {
      background-color: ${theme.colors.primaryLight};
      color: ${theme.colors.white};
      font-weight: bold;

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
    .ant-modal-body {
      padding: 24px;
    }
  }
`;
