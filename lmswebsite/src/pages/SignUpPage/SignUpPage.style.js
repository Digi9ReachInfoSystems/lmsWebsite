import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  box-sizing: border-box;

  @media (max-width: 990px) {
    flex-direction: row;
    padding: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100vh;
  }

  @media (max-width: 990px) {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

export const FormSection = styled.div`
  flex: 1;
  background: white;
  padding: 10vh 3vw;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  height: 100%; /* Set height to 100% */

  h2 {
    margin-bottom: 2vh;
    font-size: 32px;
    font-weight: 700;
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 16px;
    color: #555;
  }

  @media (max-width: 990px) {
    padding: 6vh 3vw;
    margin-bottom: 4vh;
  }

  @media (max-width: 768px) {
    padding: 5vh 3vw;
    height: auto;
    margin-bottom: 3vh;
  }

  @media (max-width: 480px) {
    padding: 5vh 3vw;
    margin-bottom: 2vh;
  }
`;

export const RoleSelection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5vh;
  text-align: center;

  .line-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    position: relative;
  }

  .line-wrapper::before,
  .line-wrapper::after {
    content: "";
    position: absolute;
    width: 40%;
    height: 1px;
    background-color: #ddd;
  }

  .line-wrapper::before {
    left: 0;
  }

  .line-wrapper::after {
    right: 0;
  }

  .line-wrapper span {
    padding: 0 1rem;
    font-weight: 500;
    color: #555;
    background-color: white;
    z-index: 1;
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 5vh;
  }

  button {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background: #fff;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;

    &.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }

    &:hover {
      background: #e0e0e0;
    }
  }

  @media (max-width: 1200px) {
    .button-container {
      gap: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    .button-container {
      flex-direction: column;
      gap: 1rem;
    }

    button {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .button-container {
      flex-direction: column;
      gap: 1rem;
    }

    button {
      width: 100%;
      font-size: 14px;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 3vh;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  @media (max-width: 1200px) {
    font-size: 14px;
  }

  @media (max-width: 990px) {
    padding: 0.75rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #ff007b;
  color: white;
  border: none;
  border-radius: 10px;
  margin-bottom: 5vh;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    background: #e6006b;
  }

  @media (max-width: 1200px) {
    padding: 0.75rem 1rem;
    font-size: 14px;
  }

  @media (max-width: 990px) {
    padding: 0.75rem 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const LinkText = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export const StudentSelects = styled.div`
  margin-bottom: 30px;

`;

const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLabel = styled.label`
  display: block;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  color: #555;
  font-size: 14px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;
