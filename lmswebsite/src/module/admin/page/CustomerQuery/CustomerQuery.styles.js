// CustomerQuery.styles.js
import styled from "styled-components";
import { media, theme } from "../../../../style/theme/theme";

export const CustomerQueryWrap = styled.div`
  .CustomerQueries-batches_nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // padding: 0 2em;
    margin: 0;

    ${media.md`
      flex-direction: column;
      align-items: stretch;
      padding: 1em;
    `}

    ${media.sm`
      flex-direction: column;
      align-items: stretch;
      padding: 1em;
    `}

    ${media.xs`
      flex-direction: column;
      align-items: stretch;
      padding: 1em;
    `}
  }

  .CustomerQueries-batch_title {
    font-family: ${theme.typography.fontFamily};
    font-size: 24px;
    // font-weight: bold;
    margin: 20px;
    color: ${theme.colors.frenchGray};
    flex: 1;

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
  }

  .CustomerQueries-search {
    max-width: 320px;
    width: 100%;
    margin-right: 25px;
    // height:40px;
    flex: 0 0 auto;
    align-items: center;
    font-size: 14px;

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

    .ant-input {
      border-radius: 6px;
      height: auto;
      padding: 0 12px;

      ${media.md`
        height: 40px;
      `}

      ${media.sm`
        height: 40px;
      `}

      ${media.xs` 
        height: 40px;
      `}
    }
  }

  .CustomerQueries-filter {
    display: flex;
    align-items: center;
    margin: 0px;

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
  }

  .CustomerQueries-filter-dropdown {
  width: 100%;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 6px;
    background-color: ${theme.colors.white};
    margin-top: 10px;
    margin-bottom: 0px;
    ${media.md`
      font-size: 14px;
    `}

    ${media.sm`
      font-size: 14px;
    `}

    ${media.xs`
      font-size: 14px;
    `}

    .ant-option{
    width: 100%;

    ${media.md`
      width: 100%;
      `
    }

    ${media.sm`
      width: 100%;
      `

      
    }

    .ant-select {
      width: 100%;
      margin-top: -10px;

      ${media.md`
        width: 100%;
        margin-top: 0px;
        `}

      ${media.sm`
        width: 100%;
        margin-top: 0px;
        `}

      ${media.xs`
        width: 100%;
        margin-top: 0px;
        `}
    }
  }

  .CustomerQueries-filter-icon {
    font-size: 18px;
    color: ${theme.colors.gray700};
    margin-right: 8px;

    ${media.md`
      font-size: 16px;
    `}

    ${media.sm`
      font-size: 16px;
    `}

    ${media.xs`
      font-size: 16px;
    `}
  }
    .CustomerQueries-dropdown
    {
    width: 100%;
    // padding: 5px;
    // display: flex;
    // align-items: center;
    // // border-radius: 4px;
    // background-color: ${theme.colors.white};

    ${media.md`
      font-size: 14px;
      width: 100%;
    `}

    ${media.sm`
      font-size: 14px;
      width: 100%;
    `}

    ${media.xs`
      font-size: 14px;
      width: 100%;
    `}
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
`;
