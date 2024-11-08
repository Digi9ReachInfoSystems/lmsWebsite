import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { TeacherApplicationFormReviewWrap } from "./TeacherApplicationFormreview.styles";
import { getSingleTeacherApplication, approveTeacherApplication } from "../../../../api/teachersApplicationApi";

const TeacherApplicationFormReview = ({ teacher_Id}) => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
   

    const fetchTeacherDetails = async () => {
      try {
        const data = await getSingleTeacherApplication(teacher_Id);
        if (!data) {
          throw new Error("Teacher not found");
        }
        setTeacher(data);
      } catch (err) {
        console.error("Error fetching teacher:", err);
        setError("Failed to fetch teacher details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherDetails();
  }, []);

  const handleApprove = async () => {
    try {
      await approveTeacherApplication(teacher_Id);
      alert("Application approved successfully!");
      navigate("/admin/applicationFormReview"); // Redirect to applications list
    } catch (error) {
      console.error("Error approving application:", error);
      alert("Failed to approve the application.");
    }
  };

  const handleReject = async () => {
    try {
      await approveTeacherApplication(teacher_Id, { approval_status: "rejected" });
      alert("Application rejected.");
      navigate("/admin/applicationFormReview"); // Redirect to applications list
    } catch (error) {
      console.error("Error rejecting application:", error);
      alert("Failed to reject the application.");
    }
  };

  if (loading) return <p>Loading teacher details...</p>;
  if (error) return <p className="error_message">{error}</p>;

  return (
    <TeacherApplicationFormReviewWrap>
      <div className="TeacherApplicationFormReview-form">
        <div className="TeacherApplicationFormReview-teacherContainer">
          <h2 className="TeacherApplicationFormReview-teacherTitle">Application Review</h2>
          <p className="TeacherApplicationFormReview-teacherSubtitle">Teacher Details</p>

          <div className="TeacherApplicationFormReview-profile-placeholders">
            {teacher?.application.profileImage ? (
              <img
                src={teacher.application.profileImage}
                alt="Profile"
                className="profile-image-preview"
              />
            ) : (
              <p>No Profile Image Available</p>
            )}
          </div>

          <div className="TeacherApplicationFormReview-field">
            <label>Name:</label>
            <input type="text" value={teacher?.application.teacher_id.name || "N/A"} readOnly />
          </div>

          <div className="TeacherApplicationFormReview-field">
            <label>State:</label>
            <input type="text" value={teacher?.application.state || "N/A"} readOnly />
          </div>

          <div className="TeacherApplicationFormReview-field">
            <label>City:</label>
            <input type="text" value={teacher?.application.city || "N/A"} readOnly />
          </div>

          <div className="TeacherApplicationFormReview-field">
            <label>Pincode:</label>
            <input type="text" value={teacher?.application.pincode || "N/A"} readOnly />
          </div>

          <div className="TeacherApplicationFormReview-field">
            <label>Current Position:</label>
            <input type="text" value={teacher?.application.current_position || "N/A"} readOnly />
          </div>

          <div className="TeacherApplicationFormReview-field">
            <label>Contact Number:</label>
            <input type="number" value={teacher?.application.phoneNumber || "N/A"} readOnly />
          </div>

          <div className="TeacherApplicationFormReview-field">
            <label>Experience:</label>
            <input type="number" value={teacher?.application.experience || "N/A"} readOnly />
          </div>

          <div className="TeacherApplicationFormReview-field">
            <label>Language:</label>
            <input type="text" value={teacher?.application.language || "N/A"} readOnly />
          </div>

          <div className="TeacherApplicationFormReview-resume-placeholder">
            {teacher?.application.resume_link ? (
              <a
                href={teacher.application.resume_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            ) : (
              <p>No Resume Available</p>
            )}
          </div>
           
         { teacher?.application.approval_status === "pending" &&
          
          <div className="TeacherApplicationFormReview-Contact">
            <button onClick={handleReject} id="TeacherApplicationFormReview-TeacherReject">
              Reject
            </button>
            <button onClick={handleApprove} id="TeacherApplicationFormReview-TeacherApprove">
              Approve
            </button>
          </div>}
        </div>
      </div>
    </TeacherApplicationFormReviewWrap>
  );
};

export default TeacherApplicationFormReview;
