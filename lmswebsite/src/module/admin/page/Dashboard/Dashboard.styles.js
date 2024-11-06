import styled from "styled-components";
import { media } from "../../../../style/theme/theme";

export const DashboardScreenWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh; /* Use viewport units for consistent spacing on different screens */
  width: 100%;
  max-width: 80vw; /* Responsive max width */
  margin: 5 auto;

  .area-row {
    display: flex;
    gap: 2vw; /* Responsive gap between items */
    width: 100%;
    max-width: 100%;
    margin: 0 auto;

    &.ar-one {
      justify-content: space-between;
      align-items: center;
    }

    &.ar-two {
      justify-content: space-between;
      align-items: flex-start;
    }

    &.ar-three {
      display: block;
    }

    /* Responsive layout for medium screens */
    ${media.md`
      flex-direction: column;
      gap: 2vh;
      align-items: center;
      max-width: 100%;
    `}

    /* Responsive layout for small screens */
    ${media.sm`
      flex-direction: column;
      gap: 2vh;
      align-items: center;
      max-width: 100%;
    `}
  }
`;
