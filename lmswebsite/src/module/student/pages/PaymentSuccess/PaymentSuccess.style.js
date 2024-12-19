// PaymentSuccess.style.js

import styled from "styled-components";
import { theme,media } from "../../../../style/theme/theme";

export const Container = styled.div`

border-radius: 10px;
// border: 2px solid  ${(props)=>props.theme.colors.malachite};
height: 60vh;
width: 70vh;  
  display: flex;
  margin:auto;
  margin-top: 180px;
  flex-direction: column;
  justify-content: center; /* Vertical centering */
  align-items: center; /* Horizontal centering */
 
  text-align: center;
  background-color:  ${(props)=>props.theme.colors.white}; /* Light background color for contrast */
 ${
    media.md`
     padding: 20px; /* Padding for smaller screens */
    `
 }
 
 p{
  font-size: 1.2rem;
  color: ${(props)=>props.theme.colors.black}; 
  margin-bottom: 3rem;
`;

export const Message = styled.h1`
  font-size: 2.5rem;
  color: ${(props)=>props.theme.colors.black}; /* Ant Design's success green color */
  margin-bottom: 4rem;

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
  margin-top: 2rem;
  padding: 20px;
  &:hover {
    cursor: pointer;
    // background-color:  ${(props)=>props.theme.colors.red};
  }
`;


export const Div = styled.div`
width: 100%;
height: 30%;
display: flex;
padding: 10px;
margin: auto;
margin-top: 0px;
justrify-content: center;
align-items: center;
font-size: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  background-color:  ${(props)=>props.theme.colors.newGreen}; /* Light background color for contrast */
  ` 