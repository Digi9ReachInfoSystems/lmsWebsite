import styled from "styled-components";
import { media, theme } from "../../../../style/theme/theme";

export const CreatedBatchWrap = styled.div`

.created-batch-batches_nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2em;
    margin: 0;

    ${media.md`
      flex-direction: column;
      align-items: stretch;
      padding: 1em;
    `}
  }

  .created-batch-batch_title {
    font-family: ${theme.typography.fontFamily};
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    flex:1;
  }

  .create-Batch-search {
    max-width: 320px;
    width: 100%;
    margin-right:25px;
   
      flex: 0 0 auto;
      align-items: center; 

    ${media.md`
      max-width: 100%;
      margin-top: 1em;
    `}

    .input-group {
      width: 100%;
      background-color: ${(props) => props.theme.colors.white};
      border-radius: 6px;
       height: 40px; 
       margin-top:40px;
   
       padding-right:10px;
      display: flex;
      align-items: center;
      padding: 4px 12px;
      position: relative;

      ${media.lg`
        height: 40px;
      `}

      .input-icon {
        width: 20px;
        display: inline-flex;
        align-items: center;
      }

      .input-control {
        // flex: 1;
        border: none;
        outline: 0;
        font-size: 15px;
        color: ${(props) => props.theme.colors.gray700};
        padding-left: 12px;
        background-color: transparent;

        &::placeholder {
          color: ${(props) => props.theme.colors.gray700};
        }
      }
    }
  }


 

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
    background: ${theme.colors.pink}!important;
    color: ${theme.colors.white}!important;
    border: 2px solid ${theme.colors.white};
    border-radius: 10px;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
      flex: 0 0 auto;
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
