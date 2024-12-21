// src/components/AssignmentsPage.jsx

import React, { useEffect, useState } from 'react';
import { getAssignmentsByBatchId } from '../../../../api/assignmentApi';
import { useParams, Link } from 'react-router-dom';
import UploadAssignmentModal from '../StudentUploadAssignmentModal/StudentUploadAssignmentModal';
import { IoMdArrowRoundBack } from "react-icons/io";
const AssignmentsPage = () => {
  const { batchId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const assignmentsData = await getAssignmentsByBatchId(batchId);

        console.log("assignmentsData:", assignmentsData);
        console.log('Type of assignmentsData:', typeof assignmentsData);
        console.log('Is assignmentsData an array?', Array.isArray(assignmentsData));

        if (Array.isArray(assignmentsData)) {
          setAssignments(assignmentsData);
          console.log('Assignments set:', assignmentsData);
        } else if (assignmentsData && Array.isArray(assignmentsData.assignments)) {
          setAssignments(assignmentsData.assignments);
          console.log('Assignments set from assignmentsData.assignments:', assignmentsData.assignments);
        } else {
          console.warn('No assignments found or unexpected response structure.');
          setAssignments([]); // Default to empty array
        }
      } catch (err) {
        console.error('Error fetching assignments:', err);
        setError(err.message || 'Failed to fetch assignments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [batchId]);

  const handleUploadClick = (assignment) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAssignment(null);
    setModalOpen(false);
  };

  const handleUploadSuccess = () => {
    // Optionally, refresh assignments or show a success message
    setModalOpen(false);
    // For simplicity, refetch assignments
    setLoading(true);
    getAssignmentsByBatchId(batchId)
      .then((assignmentsData) => {
        if (Array.isArray(assignmentsData)) {
          setAssignments(assignmentsData);
        } else if (assignmentsData && Array.isArray(assignmentsData.assignments)) {
          setAssignments(assignmentsData.assignments);
        } else {
          setAssignments([]);
        }
      })
      .catch((err) => {
        console.error('Error refetching assignments after upload:', err);
        setError('Failed to refresh assignments after upload.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) return <div>Loading assignments...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>

         <Link to={`/student/dashboard/assignments`   } >
              <IoMdArrowRoundBack />
              </Link>
              <h1
               style={
                {
                  color: '#bdc9d3',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                }
            }
              >
        Assignments for {assignments.length > 0 ? assignments[0].batch_id.batch_name : 'Batch'}
      </h1>
      {assignments.length === 0 ? (
        <div>No assignments found.</div>
      ) : (
        <div style={styles.cardContainer}>
          {assignments.map((assignment) => (
            <div key={assignment._id} style={styles.card}>
              <h3
              style={
                {
                  color: 'black',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                }

              }
              > {assignment.batch_id?.batch_name}</h3>
              <p>
                <strong>Content:</strong>{' '}
                <a href={assignment.content_url} target="_blank" rel="noopener noreferrer"
                style={
                  {
                    color:"#EE1B7A",
                }}
                >
                  View Content
                </a>
              </p>
              <p>
                <strong>Expiry Date:</strong> {new Date(assignment.expiry_date).toLocaleDateString()}
              </p>
              {/* Add more assignment details as needed */}
              <button onClick={() => handleUploadClick(assignment)} 
                // style={styles.button}
                style={{ marginTop: '10px', padding: '10px', backgroundColor: '#EE1B7A', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                Upload Assignment
              </button>
            </div>
          ))}
        </div>
      )}

      {modalOpen && selectedAssignment && (
        <UploadAssignmentModal
          assignment={selectedAssignment}
          onClose={handleCloseModal}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px'
    
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
    width: '300px',
    boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: '#dc3545',
    padding: '20px',
  },
};

export default AssignmentsPage;
