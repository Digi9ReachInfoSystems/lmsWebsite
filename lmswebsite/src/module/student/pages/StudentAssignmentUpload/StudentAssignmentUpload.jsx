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

        ////console.log("assignmentsData:", assignmentsData);
        ////console.log('Type of assignmentsData:', typeof assignmentsData);
        //console.log('Is assignmentsData an array?', Array.isArray(assignmentsData));

        if (Array.isArray(assignmentsData)) {
          setAssignments(assignmentsData);
          //console.log('Assignments set:', assignmentsData);
        } else if (assignmentsData && Array.isArray(assignmentsData.assignments)) {
          setAssignments(assignmentsData.assignments);
          //console.log('Assignments set from assignmentsData.assignments:', assignmentsData.assignments);
        } else {
          //console.warn('No assignments found or unexpected response structure.');
          setAssignments([]); // Default to empty array
        }
      } catch (err) {
        //console.error('Error fetching assignments:', err);
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
    // Close modal and re-fetch assignments to update UI
    setModalOpen(false);
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
        //console.error('Error refetching assignments after upload:', err);
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
      {/* Back arrow link */}
      <Link to={`/student/dashboard/assignments`}>
        <IoMdArrowRoundBack />
      </Link>

      {/* Page Title */}
      <h1
        style={{
          color: '#bdc9d3',
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        Assignments for {assignments.length > 0 ? assignments[0].batch_id.batch_name : 'Batch'}
      </h1>

      {assignments.length === 0 ? (
        <div>No assignments found.</div>
      ) : (
        <div style={styles.cardContainer}>
          {assignments.map((assignment) => {
            const expiryDate = new Date(assignment.expiry_date);
            const now = new Date();
            const isDeadlineCrossed = expiryDate < now;

            // If there's at least one response, consider it submitted
            const isSubmitted = assignment.responses && assignment.responses.length > 0;

            return (
              <div key={assignment._id} style={styles.card}>
                {/* Card Header: Batch Name on the left, "Submitted" on the right if isSubmitted */}
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>
                    {assignment.batch_id?.batch_name}
                  </h3>
                  {isSubmitted && (
                    <span style={styles.submitted}>Submitted</span>
                  )}
                </div>

                {/* Content Link */}
                <p>
                  <strong>Content:</strong>{' '}
                  <a
                    href={assignment.content_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#EE1B7A' }}
                  >
                    View Content
                  </a>
                </p>

                {/* Expiry Date */}
                <p>
                  <strong>Expiry Date:</strong>{' '}
                  {expiryDate.toLocaleDateString()}
                </p>

                {/* Button or Deadline Crossed */}
                {!isSubmitted && (
                  isDeadlineCrossed ? (
                    <div style={styles.deadlineCrossed}>Deadline crossed</div>
                  ) : (
                    <button
                      onClick={() => handleUploadClick(assignment)}
                      style={styles.button}
                    >
                      Upload Assignment
                    </button>
                  )
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
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

/* ----- STYLES ----- */
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
    width: '300px',
    boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  cardTitle: {
    color: 'black',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  submitted: {
    color: '#28a745',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#EE1B7A',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  deadlineCrossed: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: '#dc3545',
    padding: '20px',
  },
};

export default AssignmentsPage;
