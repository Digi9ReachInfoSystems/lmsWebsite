import styled from "styled-components";
import { media, theme } from "../../../../style/theme/theme";

export const TeacherDashBoardCardswrap = styled.main`
  background-color: ${theme.colors.bgcolor};

  .welcome-Container {
    // display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 56vw;
    border-radius: 20px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-bottom: 20px;
    background-color: ${theme.colors.nyanza};
  }
  .area-row {
    display: flex;
    gap: 24px;
    width: 100%;

    &.ar-two {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      height: 380px; /* Set a specific height */
    }

    &.ar-three {
      display: block;
    }

    ${media.md`
      flex-direction: column;
      .ar-two {
        height: auto; /* Allow auto height on smaller screens */
      }
    `}
  }

  /* Specific styling for the 60-40 layout */
  .user-engagement-container {
    flex: 3; /* 60% */
    height: 100%; /* Fill parent height */
  }

  .contact-forms-container {
    flex: 2; /* 40% */
    height: 100%; /* Fill parent height */
  }
`;
