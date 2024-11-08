import styled from "styled-components";
import { media, theme } from "../../../../style/theme/theme";

export const CustomerQueryWrap = styled.div`
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
   
  &.CustomerQuery-batchesNav {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0rem 1rem 1rem;
  }
  
  &.CustomerQuery-batchTitle {
    font-family: ${theme.typography.fontFamily};
  }
&.CustomerQuery-link {
    background: ${(props) => props.theme.colors.lightPink};
    padding: 0.3em 1em;
    border-radius: 20px;
  }
`;