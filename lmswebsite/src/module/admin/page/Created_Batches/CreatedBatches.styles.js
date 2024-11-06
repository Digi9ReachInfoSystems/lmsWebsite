import styled from "styled-components";
import { media, theme } from "../../../../style/theme/theme";

export const CreatedBatchWrap = styled.div`
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
    /* Navigation Section row1 */
  .created-batch-batches_nav {
    width:100%;
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    margin-right: 2em;
     ${media.md`
      
      padding-right: 2rem !important;
    `}
   }

.created-batch-batch_title {
    font-family: ${theme.typography.fontFamily}
    font-size: 1.5rem;
    font-weight: bold;
}

.created-batch-batch_btn {
    width: 150px;
    height: 40px;
    background: ${theme.colors.white}!important;
    color: ${theme.colors.black}!important;
    border: 2px solid ${theme.colors.frenchGray};
    border-radius: 10px;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.created-batch-batch_icon {
    font-size: 1.3rem;
    margin-right: 5px;
}

.created-batch-batch_icon span {
    font-size: 1rem;
    font-weight: 500;
}
`;
