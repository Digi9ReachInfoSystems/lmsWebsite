import styled from "styled-components";
import { media } from "../../style/theme/theme";

// Full-page container
export const LoginPageWrap = styled.div`
  display: flex;
  height: 100vh;


  
  background: ${(props) => props.theme.colors.white};
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .login-textfields {
    padding: 2em;
  }

  .left-container {
    flex: 1;
    background: #4f4f4f; /* Background for left side */
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    h1 {
      font-size: 3rem;
      font-weight: bold;
    }
    p {
      font-size: 1.25rem;
      margin-top: 1rem;
    }
  }

  .right-container {
    flex: 1;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }

  .caption {
    padding-bottom: 0.7em;
    font-size: 10px;
    color: ${(props) => props.theme.colors.gray700};
  }
`;

// Background containers
export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 70%;
  background: ${(props) => props.theme.colors.white || "transparent"};
  // z-index: -;

  &:nth-child(1) {
    left: 0;
    background: ${(props) => props.theme.lineargradients.leftGradient};
  }

  &:nth-child(2) {
    right: 0;
    background: ${(props) => props.theme.lineargradients.rightGradient};
  }

  ${media.md`
    width: 100%;
    height: 50%;
  `}
`;

// Container for the login form
export const LoginFormContainer = styled.div`
  background: ${(props) => props.theme.colors.darkwhite};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 550px;
  // max-height: 500px;
  z-index: 6;
  margin-left: 40vw;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;

  ${media.lg`
    padding: 2rem;
  margin-left: 0vw; 

  `}
`;

// Title Styling
export const Title = styled.h2`
  color: ${(props) => props.theme.colors.gray700};
  font-size: 24px;
  margin-bottom: 1rem;
  padding-top: 3rem;
  padding-left: 2rem;
`;
export const SubTitle = styled.h2`
  color: ${(props) => props.theme.colors.gray700};
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 1rem;
  // padding-top: 3rem;
  padding-left: 2rem;
`;

export const ForgotPassword = styled.a`
  color: ${(props) => props.theme.colors.newGreen};
  // text-align: left;
  font-size: 0.7rem;
  cursor: pointer;
  margin-bottom: 1rem;
  text-decoration: none;
  //
  &:hover {
    text-decoration: underline;
  }
`;

// Create Account link (styled to be bold and colored)
export const SubTitle1 = styled.p`
  color: ${(props) => props.theme.colors.primary};
  // font-weight: bold;
  font-size: 0.9rem;
  text-align: center;
  // margin-top: 1rem;

  a {
    color: ${(props) => props.theme.colors.newGreen};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: ${(props) => props.theme.colors.newGreen};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.gray300};
    cursor: not-allowed;
  }
`;





