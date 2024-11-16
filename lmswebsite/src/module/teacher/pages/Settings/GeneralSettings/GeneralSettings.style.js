// src/AccountSettings/style.js
import styled from "styled-components";

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) and (min-width: 481px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    flex-direction: row; /* Display inputs in a row on smaller screens */
    align-items: center; /* Center the input fields vertically */
    gap: 10px; /* Add space between label and input */
  }
`;

export const Label = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;

  @media (max-width: 1200px) {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    margin-bottom: 0; /* Remove bottom margin for row layout */
  }
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  color: #999;
  background-color: #f1f1f1;
  border: none;
  border-radius: 5px;
  outline: none;

  @media (max-width: 1200px) {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    width: 100%; /* Allow the input to take full width in small screens */
  }
`;

export const FileInput = styled.input`
  padding: 10px;
  font-size: 14px;
  color: #999;
  background-color: #f1f1f1;
  border: none;
  border-radius: 5px;
  outline: none;

  @media (max-width: 1200px) {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    width: 100%;
  }
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  color: #999;
  background-color: #f1f1f1;
  border: none;
  border-radius: 5px;
  outline: none;

  @media (max-width: 1200px) {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    width: 100%;
  }
`;

export const Heading = styled.h2`
  grid-column: span 2;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;
