import React, { useEffect } from "react";
import { BatchCardWrap } from "./BatchCard.styles";
import { useNavigate } from "react-router-dom";
import { getStudentBatchStatus, getStudentByAuthId } from "../../../../api/studentApi";

const BatchCard = ({ batch }) => {
  // Destructure the required fields from the batch object
  const {
    batch_image,
    batch_name,
    class_id,
    subject_id,
    teacher_id,
    date,
    studentcount,
    action,
  } = batch;
  const navigate = useNavigate();
  const [status, setStatus] = React.useState(false);

  useEffect(() => {
    const apiCaller = async () => {
      const autId = JSON.parse(localStorage.getItem("sessionData")).userId;
      const studentData = await getStudentByAuthId(autId);
      const batchStatus = await getStudentBatchStatus(studentData.student._id, batch._id);
      setStatus(batchStatus.status);
    }
    apiCaller();

    setStatus(action);
  }, []);

  // Format the date to a readable format
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <BatchCardWrap>
      <div className="batch-card">
        <div className="status-container">
          {/* Status Tab */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: status ? "#4CAF50" : "#FF2C2C",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            { status ? "Active" : "Inactive"}
          </div>
        </div>
        <div className="batch-image-container">
          <img
            src={
              batch_image || "https://via.placeholder.com/400x300?text=No+Image"
            }
            alt={batch_name}
            className="batch-image"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        </div>
        <div className="batch-content">
          {/* Header: Batch Name and Date */}
          <div className="batch-header">
            <h2 className="batch-name">{batch_name}</h2>
            {/* <div className="batch-date">📅 {formattedDate}</div> */}
          </div>

          <div className="batch-details">
            {/* Teacher Name */}
            {teacher_id && teacher_id.length > 0 && (
              <div className="detail-item">
                <span className="detail-icon">👨‍🏫</span>
                <span className="detail-text">
                  Teacher :
                  {teacher_id.map((teacher, index) => (
                    <span key={teacher._id}>
                      {teacher.user_id ? teacher.user_id.name : "Unknown"}
                      {index < teacher_id.length - 1 && ", "}
                    </span>
                  ))}
                </span>
              </div>
            )}


            {subject_id && (
              <div className="detail-item">
                <span className="detail-icon">📚</span>
                <span className="detail-text">
                  Subject: {subject_id.subject_name}
                </span>
              </div>
            )}


            {class_id && (
              <div className="detail-item">
                <span className="detail-icon">🎓</span>
                <span className="detail-text">
                  <strong>Class Level:</strong> {class_id.classLevel}
                </span>
              </div>
            )}

            {
              status ?
                (
                  <button onClick={() => {
                    navigate(`/student/dashboard/assignedBatches/${batch._id}`)
                    // handleViewAssignments(batch._id)
                  }}
                    style={
                      {
                        backgroundColor: '#EE1B7A',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 15px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                      }
                    }
                  >
                    View Materials
                  </button>
                ) : (
                  <button onClick={() => {
                    navigate(`/student/dashboard/`)
                    // handleViewAssignments(batch._id)
                  }}
                    style={
                      {
                        backgroundColor: '#EE1B7A',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 15px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                      }
                    }
                  >
                    Subscribe Now !..
                  </button>
                )
            }

            {/* Student Count */}
          </div>
        </div>
      </div>
    </BatchCardWrap>
  );
};

export default BatchCard;
