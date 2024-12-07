// AppBarWrap.js
import styled from "styled-components";
import { media } from "../../../../style/theme/theme";

export const AppBarWrap = styled.div`
  box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
  padding: 8px;
  border-radius: 6px;
  max-width: 100%;
  background-color: ${(props) => props.theme.colors.white};

  ${media.xxxl`
    padding: 14px 12px;
    margin: 12px;
  `};

  .appbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }

  .appbar-left,
  .appbar-right {
    display: flex;
    align-items: center;
    column-gap: 12px;
  }

  .appbar-title {
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.cadet};

    ${media.lg`
      display: none;
    `}
  }

  .appbar-breadcrumb {
    flex-grow: 1;
    text-align: center;

    ${media.lg`
      text-align: left;
    `}
  }

  /* ... Rest of your styled-components styles ... */
`;
