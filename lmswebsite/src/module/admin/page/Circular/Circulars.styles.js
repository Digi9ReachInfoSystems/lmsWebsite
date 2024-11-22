import styled from "styled-components";
import { theme, media } from "../../../../style/theme/theme";

export const CircularWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 20px;

  .circular-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${media.md`
      flex-direction: column;
      gap: 10px;
    `}
  }

  .circular-title {
    font-family: ${theme.typography.fontFamily};
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;

    ${media.md`
      text-align: center;
    `}
  }

  .circular-image-box {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

