// TeacherApplicationFormReview.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import "./TeacherApplicationFormReview.css";
import { getSingleTeacherApplication, approveTeacherApplication } from "../../../../api/teachersApplicationApi";

const TeacherApplicationFormReview = () => {
  const { teacherId } = useParams(); // Get teacherId from URL params
  const navigate = useNavigate(); // Initialize navigate for redirection
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch teacher details when the component mounts
  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const data = await getSingleTeacherApplication(teacherId);
        if (!data) {
          throw new Error("Teacher not found");
        }
        setTeacher(data);
      } catch (err) {
        console.error("Error fetching teacher:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeacherDetails();
  }, [teacherId]);

  const handleApprove = async () => {
    try {
      await approveTeacherApplication(teacherId);
      alert("Application approved successfully!");
      navigate("/admin/applicationFormReview"); // Redirect to applications list
    } catch (error) {
      console.error("Error approving application:", error);
      alert("Failed to approve the application.");
    }
  };

  const handleReject = async () => {
    try {
      await approveTeacherApplication(teacherId, { approval_status: "rejected" });
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

        {/* Input fields with labels horizontally */}
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

        <div className="TeacherApplicationFormReview-Contact">
          <button onClick={handleReject} id="TeacherApplicationFormReview-TeacherReject">
            Reject
          </button>
          <button onClick={handleApprove} id="TeacherApplicationFormReview-TeacherApprove">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherApplicationFormReview;
