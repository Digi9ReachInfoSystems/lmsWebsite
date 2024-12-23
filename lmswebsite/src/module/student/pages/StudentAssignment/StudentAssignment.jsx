// src/components/StudentAssignment.jsx

import React, { useEffect, useState } from 'react';
import { getStudentBatchStatus, getStudentByAuthId } from '../../../../api/studentApi';
import { getBatchesByStudentId } from '../../../../api/batchApi';
import { useNavigate } from 'react-router-dom';
import { Table, Input, Button, Space, Row, Col, Card } from "antd";

// Replace this with your actual authentication logic
const getAuthId = () => {
  // Example: Retrieve from context or a global state
  return localStorage.getItem('auth_id') || 'dummyAuthId';
};

const StudentAssignment = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        // Retrieve session data from localStorage
        const sessionData = JSON.parse(localStorage.getItem('sessionData'));
        if (!sessionData || !sessionData.userId) {
          throw new Error('User is not authenticated.');
        }

        const authId = sessionData.userId;
        const studentData = await getStudentByAuthId(authId);

        // Validate student data
        if (!studentData || !studentData.student || !studentData.student._id) {
          throw new Error('User is not a student or student data is incomplete.');
        }

        ////console.log("studentData:", studentData); // For debugging

        const studentId = studentData.student._id;

        const batchesData = await getBatchesByStudentId(studentId);

        ////console.log("batchesData:", batchesData); // For debugging
        ////console.log('Type of batchesData:', typeof batchesData);
        //console.log('Is batchesData an array?', Array.isArray(batchesData));


        const updatedBatches = await Promise.all(
          batchesData.map(async (batch) => {
            const statusValue = await getStudentBatchStatus(studentData.student._id, batch._id);; // Fetch the status
            return {
              ...batch,
              status: statusValue.status, // Add statusValue to batch data
            };
          })
        );
        //console.log("updatedBatches:", updatedBatches);

        // **Adjusting to handle array response**
        if (Array.isArray(updatedBatches)) {
          setBatches(updatedBatches);
          //console.log('Batches set:', batchesData);
        } else if (batchesData && Array.isArray(batchesData.batches)) {
          setBatches(batchesData.batches);
          //console.log('Batches set from batchesData.batches:', batchesData.batches);
        } else {
          //console.warn('No batches found or unexpected response structure.');
          setBatches([]); // Default to empty array
        }
      } catch (err) {
        //console.error('Error fetching batches:', err);
        setError(err.message || 'Failed to fetch batches.');
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  const handleViewAssignments = (batchId) => {
    navigate(`/student/dashboard/batches/${batchId}/assignments`);
  };

  if (loading) return <div>Loading batches...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h1
        style={
          {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#bdc9d3',
          }
        }
      >Your Batches</h1>
      {batches.length === 0 ? (
        <Col span={24} style={{ textAlign: "center" }}>
          <Card style={{ width: "100%", backgroundColor: "#a0f2e3" }}>
            <h3>No Batches has been assigned to your Profile yet!</h3>
          </Card>
        </Col>
      ) : (
        <div style={styles.cardContainer}>
          {batches.map((batch) => (
            <div key={batch._id} style={styles.card}>
              {/* Status Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: batch.status ? "#4CAF50" : "#FF2C2C", // Green for Active, Red for Inactive
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  zIndex: 1, // Ensure it stays above other elements
                }}
              >
                {batch.status ? "Active" : "Inactive"}
              </div>

              {/* Batch Image */}
              {batch.batch_image && (
                <img
                  src={batch.batch_image}
                  alt={`${batch.batch_name} Image`}
                  style={styles.image}
                />
              )}

              {/* Batch Name */}
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {batch.batch_name}
              </h2>

              {/* Teacher Name */}
              {batch.teacher_id && batch.teacher_id.length > 0 && batch.teacher_id[0].user_id?.name && (
                <p>
                  <strong>Teacher:</strong> {batch.teacher_id[0].user_id.name}
                </p>
              )}

              {/* Subject Name */}
              {batch.subject_id?.subject_name && (
                <p>
                  <strong>Subject:</strong> {batch.subject_id.subject_name}
                </p>
              )}

              {/* Action Button */}
              {batch.status ? (
                <button
                  onClick={() => handleViewAssignments(batch._id)}
                  style={{
                    backgroundColor: "#EE1B7A",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 15px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  View Assignments
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/student/dashboard/`)}
                  style={{
                    backgroundColor: "#EE1B7A",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 15px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  Subscribe Now
                </button>
              )}
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

// Simple inline styles; replace with CSS or styled-components as preferred
const styles = {
  container: {
    padding: '20px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    width: '250px',
    boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center', // Center align items for better presentation
    position: "relative", // Ensure absolute positioning works for the badge
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  error: {
    color: '#dc3545',
    padding: '20px',
  },
};

export default StudentAssignment;
