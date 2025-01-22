import styled from "styled-components";
import { media } from "../../../../style/theme/theme";

// import {media } from "../../../../style/theme/theme";
export const TeacherCircularWrap = styled.div`
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    ${media.md`
      flex-direction: column;
      align-items: flex-start;
    `}

    ${media.sm`
      flex-direction: column;
      align-items: flex-start;
    `}

    ${media.xs`
      flex-direction: column;
      align-items: flex-start;
    `}

    

    input {
      width: 300px;
    }
  }

  .ant-table {
    background-color: #fff;
    width: 98%;
    margin: auto;
  }

  .ant-modal-title {
    font-size: 1.5rem;
    text-align: center;

    ${media.md`
      font-size: 1.3rem;
    `}

    ${media.sm`
      font-size: 1.2rem;
    `}

    ${media.xs`
      font-size: 1.1rem;
    `}
  }

  .ant-modal-body {
    display: flex;
    justify-content: center;
    align-items: center;

    ${media.md`
      flex-direction: column;
    `}

    ${media.sm`
      flex-direction: column;
    `}

    ${media.xs`
      flex-direction: column;
    `}
  }
`;
