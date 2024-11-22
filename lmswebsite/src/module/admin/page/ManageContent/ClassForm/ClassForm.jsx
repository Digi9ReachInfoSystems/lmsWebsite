// src/module/teacher/pages/BecomeTeacherApplicationForm/TaskBoard/ClassForm.jsx

import React, { useEffect, useState } from 'react';
import {
  FormContainer,
  InlineContainer,
  Input,
  Label,
  Button,
} from './ClassForm.style'; // Corrected import
import { createClass } from '../../../../../api/classApi'; // Ensure correct path
import { getBoards } from '../../../../../api/boadApi'; // Corrected import path
import { message, Spin, Alert } from 'antd'; // Import Ant Design components for feedback

const ClassForm = () => {
  // State to manage form inputs
/*************  ✨ Codeium Command ⭐  *************/
/**
 * ClassForm component
 *
 * This component renders a table of all the classes in the system and
 * provides a form to create a new class. The form includes fields for
 * class name, class level, and board. The component stores the data
 * in local storage and fetches the boards from the backend when it
 * mounts.
 *
 * @returns {ReactElement}
 */
/******  194e67eb-4c4d-4a6b-ac3f-5db51d05bea7  *******/  const [submissionData, setSubmissionData] = useState({
    className: '',
    classLevel: '',
    curriculum: '', // Added board_id instead of curriculum
  });

  // State to manage submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to manage boards data
  const [boards, setBoards] = useState([]); // Initialized as empty array

  // State to manage loading and error states for fetching boards
  const [loadingBoard, setLoadingBoard] = useState(false);
  const [boardError, setBoardError] = useState(null); // Initialized as null

  // Fetch boards from the backend when the component mounts
  useEffect(() => {
    const fetchBoards = async () => {
      setLoadingBoard(true);
      setBoardError(null);
      try {
        const fetchedBoards = await getBoards();
        setBoards(fetchedBoards);
      } catch (error) {
        setBoardError(
          error.response?.data?.error || 'Failed to fetch Boards.'
        );
      } finally {
        setLoadingBoard(false); // Corrected to set loadingBoard
      }
    };

    fetchBoards();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmissionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Set submitting state to true to disable the button

    try {
      // Make the API call to create a new class
      const response = await createClass(submissionData);
      
      message.success('Class created successfully!');
      
      // Reset form fields
      setSubmissionData({
        className: '',
        classLevel: '',
        curriculum: '',
      });
    } catch (error) {
      // Extract error message from the response or use a default message
      let errorMsg = 'Failed to create class. Please try again.';
      
      if (error.response) {
        // Server responded with a status other than 2xx
        if (error.response.status === 403) {
          errorMsg = 'You do not have permission to create a class.';
        } else if (error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMsg = 'No response from server. Please check your network connection.';
      } else {
        // Something else caused the error
        errorMsg = error.message;
      }

      // Display error message
      message.error(errorMsg);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <FormContainer>
      <h2>Create Class</h2>
      <form onSubmit={handleSubmit}>
        {/* Class Name Field */}
        <InlineContainer>
          <Label htmlFor="className">Class Name</Label>
          <Input
            type="text"
            id="className"
            name="className"
            value={submissionData.className}
            onChange={handleChange}
            placeholder="Enter class name"
            required
          />
        </InlineContainer>

        {/* Class Level Field */}
        <InlineContainer>
          <Label htmlFor="classLevel">Class Level</Label>
          <Input
            type="text"
            id="classLevel"
            name="classLevel"
            value={submissionData.classLevel}
            onChange={handleChange}
            placeholder="Enter class level (e.g., 5th, 6th, etc.)"
            required
          />
        </InlineContainer>

        {/* Board Field */}
        <InlineContainer>
          <Label htmlFor="board_id">Board</Label>
          {loadingBoard ? (
            <Spin tip="Loading boards..." />
          ) : boardError ? (
            <Alert message={boardError} type="error" showIcon />
          ) : (
            <select
              id="board_id"
              name="curriculum"
              value={submissionData.curriculum}
              onChange={handleChange}
              required
            >
              <option value="">Select Board</option>
              {boards.map((board) => (
                <option key={board._id} value={board._id}>
                  {board.name}
                </option>
              ))}
            </select>
          )}
        </InlineContainer>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </FormContainer>
  );
};

export default ClassForm;
