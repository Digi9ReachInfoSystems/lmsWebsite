// PaymentSuccess.style.js

import styled from "styled-components";
import { theme,media } from "../../../../style/theme/theme";

export const Container = styled.div`

border-radius: 10px;
// border: 2px solid  ${(props)=>props.theme.colors.malachite};
/* height: 60vh;
width: 70vh;   */
width: 30%;
  display: flex;
  margin: 15vh auto;
  /* margin-top: 180px; */
  flex-direction: column;
  justify-content: center; /* Vertical centering */
  align-items: center; /* Horizontal centering */
 
  text-align: center;
  background-color:  ${(props)=>props.theme.colors.white}; /* Light background color for contrast */

  ${media.lg`
  width: 50%;
  `}
 ${
    media.md`
    width: 70%;
    margin: 10vh auto;
     padding: 20px; /* Padding for smaller screens */
    `
 }

 ${media.sm`
  width: 80%;
        margin: 5vh auto;
        padding: 10px;
 `}
 
 p{
  font-size: 1.2rem;
  color: ${(props)=>props.theme.colors.black};
  padding: 20px; 
  margin-bottom: 1rem;

  ${media.lg`
  width: 80%;
  margin-bottom: 0;
  `}

  ${
    media.md`
    width: 90%;
    `
 }
 }
`;

export const Message = styled.h1`
  font-size: 24px;
  color: ${(props)=>props.theme.colors.black}; /* Ant Design's success green color */
  padding: 10px;
  margin-bottom: 1rem;

  ${
    media.md`
     font-size: 2rem;
    `
 }
 ${
    media.xs`
      font-size: 1.5rem;
    `
 }

 
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 2rem; */
  padding: 20px;
  &:hover {
    cursor: pointer;
    // background-color:  ${(props)=>props.theme.colors.red};
  }
`;


export const Div = styled.div`
display: flex;
padding: 30px;
/* padding: 30px; */
/* margin: auto; */
/* margin-top: 0px; */
/* justify-content: center; */
/* align-items: center; */
font-size: 64px;
  /* display: flex; */
  flex-direction: column;
  /* justify-content: center;  */
  /* background-color:  ${(props)=>props.theme.colors.newGreen}; Light background color for contrast */

  .CheckCircleIcon{
    color: ${theme.colors.newGreen}
  }
  ` 