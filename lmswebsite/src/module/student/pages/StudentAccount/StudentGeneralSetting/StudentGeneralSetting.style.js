// import styled from "styled-components";
// import { Input, DatePicker } from "antd";

// export const StyledInput = styled(Input)`
//  font-size: 14px;
//   // color: #333;
//   background-color: transparent;
//   // border: 1px solid #ccc;
//   // outline: none;
//   flex: 1;
//   padding: 8px;
//   border-radius: 5px;

//   &:focus {
//     border: 2px solid #ff007a;
//   }


//   &:hover {
//     border: 2px solidrgb(180, 54, 115);
//   }

//   @media (max-width: 480px) {
//     font-size: 11px;
//     padding: 5px 10px;
//   }
// `;

// export const Button = styled.button`
//   width: 40%;
//   float: right;
//   background-color: #f52754;
//   color: white;
//   font-size: 13px;
//   font-weight: 500;
//   padding: 10px 20px;
//   border-color:white !important;
//   border-radius: 5px;
//   cursor: pointer;
//   text-align: center;

  

//   @media (max-width: 1200px) {
//     width: 40%;
//     font-size: 13px;
//     padding: 8px 16px;
//   }

//   @media (max-width: 768px) {
//     width: 30%;
//     font-size: 12px;
//     padding: 6px 12px;
//   }

//   @media (max-width: 480px) {
//     width: 100%; /* Full width for smaller screens */
//     font-size: 11px;
//     padding: 5px 10px;
//   }
// `;

// export const StyledDatePicker = styled(DatePicker)`
//   border-color: #f52754 !important;

//   &:focus,
//   &.ant-picker-focused {
//     border-color: #ff007a !important;
//     border:2px solid #ff007a !important;
//   }

//    &:hover {
//     border-color: #ff007a !important;
//       border:2px solid #ff007a !important;
//   }
// `;


import styled from "styled-components";
import { Input, DatePicker } from "antd";

// Breakpoints
const breakpoints = {
  xs: "480px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1440px",
  xxxl: "1600px",
};

// Styled Input
export const StyledInput = styled(Input)`
  font-size: 14px;
  background-color: transparent;
  flex: 1;
  padding: 8px;
  border-radius: 5px;

  &:focus {
    border: 2px solid #ff007a;
  }

  &:hover {
    border: 2px solid #ff007a;
  }


    /* Add horizontal scrolling below 768px */
  @media (max-width: 768px) {
    .ant-table-wrapper {
      overflow-x: scroll; /* Enable horizontal scrolling */
      width: 600px;
    }
  }
  

  @media (max-width: ${breakpoints.xl}) {
    font-size: 13px;
    padding: 8px 12px;
  }

  @media (max-width: ${breakpoints.lg}) {
    font-size: 12px;
    padding: 6px 10px;
  }

  @media (max-width: ${breakpoints.md}) {
    font-size: 11px;
    padding: 5px 8px;
  }

  @media (max-width: ${breakpoints.xs}) {
    font-size: 10px;
    padding: 4px 6px;
  }
`;

// Styled Button
export const Button = styled.button`
  width: 40%;
  float: right;
  background-color: #f52754;
  color: white;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 20px;
  border-color: white !important;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;

  @media (max-width: ${breakpoints.xxl}) {
    width: 40%;
    font-size: 13px;
    padding: 8px 16px;
  }

  @media (max-width: ${breakpoints.lg}) {
    width: 30%;
    font-size: 12px;
    padding: 6px 12px;
  }

  @media (max-width: ${breakpoints.md}) {
    width: 100%;
    font-size: 11px;
    padding: 5px 10px;
  }
`;

// Styled DatePicker
export const StyledDatePicker = styled(DatePicker)`
  border-color: #f52754 !important;

  &:focus,
  &.ant-picker-focused {
    border-color: #ff007a !important;
    border: 2px solid #ff007a !important;
  }

  &:hover {
    border-color: #ff007a !important;
    border: 2px solid #ff007a !important;
  }

  @media (max-width: ${breakpoints.xxl}) {
    width: 100%;
  }

  @media (max-width: ${breakpoints.md}) {
    font-size: 13px;
  }

  @media (max-width: ${breakpoints.xs}) {
    font-size: 12px;
  }
`;
