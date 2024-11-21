// src/module/teacher/pages/BecomeTeacherApplicationForm/TaskBoard/BoardForm.jsx

import React, { useState } from 'react';
import {
  FormContainer,
  InlineContainer,
  Input,
  Label,
  Button,
} from './BoardForm.styles'; // Ensure the file is named BoardForm.styles.js
import { createBoard } from '../../../../api/boadApi'; // Corrected import path (from boadApi to boardApi)
import { message, Spin, Alert } from 'antd'; // Ant Design components for feedback

const BoardForm = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  // State to manage submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to manage error messages
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Set submitting state to true
    setError(null); // Reset previous errors

    try {
      // Make the API call to create a new board
      const response = await createBoard(formData);

      // Display success message
      message.success('Board created successfully!');

      // Reset form fields
      setFormData({
        name: '',
        description: '',
      });
    } catch (err) {
      // Extract error message from the response or use a default message
      let errorMsg = 'Failed to create board. Please try again.';

      if (err.response) {
        // Server responded with a status other than 2xx
        if (err.response.status === 403) {
          errorMsg = 'You do not have permission to create a board.';
        } else if (err.response.data && err.response.data.error) {
          errorMsg = err.response.data.error;
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMsg = 'No response from server. Please check your network connection.';
      } else {
        // Something else caused the error
        errorMsg = err.message;
      }

      // Set error state
      setError(errorMsg);

      // Display error message
      message.error(errorMsg);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <FormContainer>
      <h2>Create Board</h2>
      <form onSubmit={handleSubmit}>
        {/* Board Name Field */}
        <InlineContainer>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter board name"
            required
          />
        </InlineContainer>

        {/* Board Description Field */}
        <InlineContainer>
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter board description"
            required
            rows="2"
            cols="50"
            style={{ resize: 'vertical' }} // Allow vertical resizing
          />
        </InlineContainer>

        {/* Display Error Message */}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: '1rem' }}
          />
        )}

        {/* Submit Button */}
        <div className='buttonboard'>
        <Button  type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spin size="small" /> : 'Submit'}
        </Button>
        </div>
      </form>
    </FormContainer>
  );
};

export default BoardForm;
