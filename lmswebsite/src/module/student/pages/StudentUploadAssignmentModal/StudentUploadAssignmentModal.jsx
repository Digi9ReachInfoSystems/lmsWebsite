// src/components/UploadAssignmentModal.jsx

import React, { useState } from 'react';
import { uploadFileToFirebase } from '../../../../utils/uploadFileToFirebase';
import { addStudentResponse } from '../../../../api/assignmentApi';
import { getStudentByAuthId } from '../../../../api/studentApi';

// Replace this with your actual authentication logic
const getAuthId = () => {
  // Example: Retrieve from context or a global state
  return localStorage.getItem('auth_id') || 'dummyAuthId';
};

const UploadAssignmentModal = ({ assignment, onClose, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    try {
      // Upload file to Firebase
      const downloadURL = await uploadFileToFirebase(file, 'student_responses');

      // Get student ID
    //   const authId = getAuthId();
    //   const studentData = await getStudentByAuthId(authId);
    //   if (!studentData || !studentData.student || !studentData.student._id) {
    //     throw new Error('Failed to retrieve student information.');
    //   }
    //   const studentId = studentData.student._id;

    const sessionData = JSON.parse(localStorage.getItem('sessionData'));
    if (!sessionData || !sessionData.userId) {
      throw new Error('User is not authenticated.');
    }   

    const authId = sessionData.userId;
    const studentData = await getStudentByAuthId(authId);
    if (!studentData || !studentData.student || !studentData.student._id) {
      throw new Error('Failed to retrieve student information.');
    }
    const studentId = studentData.student._id;


      // Prepare response data
      const responseData = {
        student_id: studentId,
        response_url: downloadURL,
        submission_date: new Date().toISOString(),
      };

      // Submit the response via API
      await addStudentResponse(assignment._id, responseData);

      // Optionally, show success message or refresh data
      alert('Assignment submitted successfully!');
      onUploadSuccess();
    } catch (err) {
      console.error('Error uploading assignment:', err.response?.data || err.message);
      setError(err.message || 'Failed to upload assignment. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2
        style={{
          color: '#EE1B7A',
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
        >Upload Assignment</h2>
        <form onSubmit={handleSubmit}>
          <div style={{
            ...styles.formGroup,
            
          }}>
            <label>Select File:</label>
            <input type="file" onChange={handleFileChange} required />
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.uploadButton} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
            <button type="button" style={styles.cancelButton} onClick={onClose} disabled={uploading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '2px 2px 12px rgba(0,0,0,0.2)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  uploadButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: '#dc3545',
    marginBottom: '10px',
  },
};

export default UploadAssignmentModal;
