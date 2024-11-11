import styled from "styled-components";
import { media, theme } from "../../../../style/theme/theme";

export const TeacherApplicationFormViewWrap = styled.div`

.TeachersApplicationFormView-batches_nav {
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

  .TeachersApplicationFormView-batch_title {
    font-family: ${theme.typography.fontFamily};
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    flex:1;
  }
.TeachersApplicationFormView-search {
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

.TeachersApplicationFormView-link{
color:${(props) => props.theme.colors.pink4};
background:${(props) => props.theme.colors.pink3};
padding: 0.4em 1em 0 1em;
border:none;
border-radius: 20px!important;
      }

  
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

  /* Styles for the filter container */
.TeachersApplicationFormView-filter {
  display: flex;
  align-items: center;
  margin:0px; /* Adjust spacing as needed */
}

/* Styles for the filter dropdown container */
.filter-dropdown {
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 5px;
  background-color:${(props) => props.theme.colors.white}; /* White background */
  margin-top: 10px;
  margin-bottom :0px;
  ${media.md`
    
     font-size: 14px;
    `}
}

/* Styles for the filter icon */
.filter-icon {
  font-size: 18px; /* Adjust the size as needed */
  color:${(props) => props.theme.colors.gray700}; /* Icon color */
  margin-right: 8px;
}

/* Styles for the dropdown select element */
.TeachersApplicationFormView-dropdown {
  // border: none;
  // outline: none;
  // font-size: 16px;
  // background-color:${(props) => props.theme.colors.white};
  // // color: #333;
  // // background-color: transparent; /* Transparent to show parent background */
  // cursor: pointer;
}

/* Remove default arrow icon */
.TeachersApplicationFormView-dropdown {
  -webkit-appearance: none;
  -moz-appearance: none;
  // appearance: none;
  background-color:${(props) => props.theme.colors.white};
}

/* Custom arrow icon */
.TeachersApplicationFormView-dropdown {
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="5"><path fill="%23333" d="M0 0l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px;
  padding-right: 25px; /* Space for the custom arrow */
}

/* Adjust padding inside the select */
.TeachersApplicationFormView-dropdown {
  padding-left: 0;
}


   
`;
