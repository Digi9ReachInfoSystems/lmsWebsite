import React from "react";
import { BatchCardWrap } from "./BatchCard.styles";

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

  // Format the date to a readable format
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <BatchCardWrap>
      <div className="batch-card">
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

            {/* Student Count */}
          </div>
        </div>
      </div>
    </BatchCardWrap>
  );
};

export default BatchCard;
