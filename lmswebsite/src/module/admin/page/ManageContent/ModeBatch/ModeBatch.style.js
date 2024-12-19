// src/components/ModeBatch.style.js

import styled from 'styled-components';

export const Container = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 25px;
  background-color: #fefefe;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #94d3a2;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 20px;
  font-weight: 500;
`;

export const SuccessMessage = styled.div`
  color: #28a745;
  margin-bottom: 20px;
  font-weight: 500;
`;

export const DiscountInfo = styled.div`
  margin-bottom: 20px;
  font-weight: 500;
  color: #555;
`;


export const FeatureContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const FeatureInput = styled.input`
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const AddFeatureButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #28a745; /* Green */
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  opacity: ${(props) => (props.disabled ? '0.6' : '1')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) => (props.disabled ? '#28a745' : '#218838')};
  }

  svg {
    margin-right: 5px;
  }
`;

export const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 15px;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  background-color: #f8f9fa; /* Light gray */
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 4px;
`;

export const RemoveFeatureButton = styled.button`
  background-color: transparent;
  border: none;
  color: #dc3545; /* Red */
  cursor: pointer;
  margin-left: auto;
  display: flex;
  align-items: center;

  &:hover {
    color: #c82333;
  }

  svg {
    margin-left: 5px;
  }
`;
