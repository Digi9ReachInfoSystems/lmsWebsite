import styled from "styled-components";
import { media } from "./../../style/theme/theme"; // Adjust the path as necessary

export const LoginPageWrap = styled.div`
  .login-container {
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color: #f3f4f6;
    margin: 0;

    ${media.md`
      flex-direction: column;
      align-items: center;
    `}
  }

  /* Left Section (Branding) */
  .login-image {
    flex: 3; /* 60% width */
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #ff0076, #ff5096);
    position: relative;

    ${media.md`
      height: 50vh;
      flex: none;
      width: 100%;
    `}

    ${media.sm`
      height: 40vh;
    `}
  }

  .login-image img {
    max-width: 100%;
    height: 100vh;

    ${media.md`
      height: auto;
      max-height: 100%;
    `}
  }

  .login-page-form-main-container {
    flex: 2; /* 40% width */
    padding: 5rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${media.xl`
      padding: 4rem;
    `} ${media.lg`
      padding: 3rem;
    `} ${media.md`
      padding: 2rem;
      width: 90%;
    `} ${media.sm`
      padding: 1.5rem;
      width: 100%;
    `};
  }

  h2 {
    color: ${(props) => props.theme.colors.gray700};
    font-size: 2rem;
    margin-bottom: 0.5rem;

    ${media.md`
      font-size: 1.75rem;
    `}

    ${media.sm`
      font-size: 1.5rem;
    `}
  }

  p {
    color: ${(props) => props.theme.colors.frenchGray};
    margin-bottom: 1.5rem;

    ${media.md`
      margin-bottom: 1rem;
    `}
  }

  .error-message {
    color: red;
    margin-bottom: 1rem;

    ${media.sm`
      font-size: 0.9rem;
    `}
  }

  .input-group {
    margin-bottom: 1.5rem;

    ${media.sm`
      margin-bottom: 1rem;
    `}
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: bold;

    ${media.sm`
      font-size: 0.9rem;
    `}
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;

    ${media.sm`
      padding: 0.5rem;
      font-size: 0.9rem;
    `}
  }

  .options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    ${media.md`
      flex-direction: column;
      align-items: flex-start;
    `}
  }

  .options a {
    color: #ff0076;
    text-decoration: none;
    font-weight: bold;

    ${media.sm`
      font-size: 0.9rem;
    `}
  }

  .login-button {
    width: 100%;
    padding: 1rem;
    background: ${(props) => props.theme.lineargradients.pinkGradient};
    border: none;
    border-radius: 2.2rem;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
    margin-bottom: 1rem;

    ${media.sm`
      padding: 0.75rem;
      font-size: 0.9rem;
    `}
  }

  .login-button:hover {
    background: linear-gradient(to right, #ff4f88, #ff0076);
  }

  p a {
    color: #ff0076;
    text-decoration: none;
    font-weight: bold;

    ${media.sm`
      font-size: 0.9rem;
    `}
  }
`;
