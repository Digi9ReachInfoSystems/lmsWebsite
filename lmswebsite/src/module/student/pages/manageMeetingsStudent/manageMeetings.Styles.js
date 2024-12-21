// import styled from "styled-components";
// export const manageMeetingwrap = styled.div`
// `;


import styled from "styled-components";
import { media } from "../../../../style/theme/theme";

export const ManageMeetingWrap = styled.div`
  padding: 20px;

  h1 {
    font-size: 24px;
    ${media.md(`
      font-size: 20px;
    `)}
    ${media.sm(`
      font-size: 18px;
    `)}
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    ${media.md(`
      padding: 8px 16px;
      font-size: 14px;
    `)}
    ${media.sm(`
      padding: 6px 12px;
      font-size: 12px;
    `)}
  }

  .calendar-container {
    ${media.lg(`
      height: 600px;
    `)}
    ${media.md(`
      height: 500px;
    `)}
    ${media.sm(`
      height: 400px;
    `)}
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .error {
    color: red;
    text-align: center;
    margin-top: 20px;
  }
`;
