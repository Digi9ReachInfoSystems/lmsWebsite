import styled from "styled-components";
import { media } from "../../../../style/theme/theme";

export const DashboardScreenWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;

  .area-row {
    display: flex;
    gap: 24px;

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
