import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TeacherApplicationFormReviewWrap } from "./TeacherApplicationFormreview.styles";
import {
  getSingleTeacherApplication,
  approveTeacherApplication,
} from "../../../../api/teachersApplicationApi";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css";
const TeacherApplicationFormReview = ({ teacher_Id, closeModal }) => {
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
      toast.success("Application approved successfully!");
      closeModal();
    } catch (error) {
      console.error("Error approving application:", error);
      toast.error("Failed to approve the application.");
    }
  };

  const handleReject = async () => {
    try {
      await approveTeacherApplication(teacher_Id, {
        approval_status: "rejected",
      });
      toast.error("Application rejected.");
      navigate("/admin/applicationFormReview"); // Redirect to applications list
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast.error("Failed to reject the application.");
    }
  };

  if (loading) return <p>Loading teacher details...</p>;
  if (error) return <p className="error_message">{error}</p>;
  const handleViewResume = () => {
    if (teacher?.application.resume_Link) {
      window.open(teacher?.application.resume_Link, "_blank");
    } else {
      toast.error("No resume found.");
    }
  };
  return (
    <TeacherApplicationFormReviewWrap>
      <div className="modal-header">
        <h2>Review Teacher Application</h2>
      </div>
      <div className="modal-content">
        <div className="teacher-details">
          <div className="teacher-details-heading">Basic Info </div>

          <div className="teacher-details-row">
            <div className="teacher-details-item">
              <p>Name</p>
              <p className="Values">
                {teacher?.application.teacher_id.name || "N/A"}
              </p>
            </div>
            <div className="teacher-details-item">
              <p>Email</p>
              <p className="Values">
                {teacher?.application.teacher_id.email || "Na"}
              </p>
            </div>
          </div>
          <div className="teacher-details-row">
            <div className="teacher-details-item">
              <p>State</p>
              <p className="Values">{teacher?.application.state || "N/A"}</p>
            </div>
            <div className="teacher-details-item">
              <p>City</p>
              <p className="Values">{teacher?.application.city || "N/A"}</p>
            </div>
            <div className="teacher-details-item">
              <p>Pincode</p>
              <p className="Values">{teacher?.application.pincode || "N/A"}</p>
            </div>
          </div>
        </div>
        <div className="teacher-details">
          <div className="teacher-details-heading">
            Educational Information{" "}
          </div>

          <div className="teacher-details-row">
            <div className="teacher-details-item">
              <p>Current Position</p>
              <p className="Values">
                {teacher?.application.current_position || "N/A"}
              </p>
            </div>
            <div className="teacher-details-item">
              <p>Contact Number</p>
              <p className="Values">
                {teacher?.application.phoneNumber || "Na"}
              </p>
            </div>
          </div>
          <div className="teacher-details-row">
            <div className="teacher-details-item">
              <p>Experience</p>
              <p className="Values">
                {teacher?.application.experience || "N/A"}
              </p>
            </div>
            <div className="teacher-details-item">
              <p>Language</p>
              <p className="Values">{teacher?.application.language || "N/A"}</p>
            </div>
          </div>
        </div>
        <button onClick={handleViewResume} className="view-resume-btn">
          View Resume
        </button>
      </div>
    </TeacherApplicationFormReviewWrap>
  );
};

export default TeacherApplicationFormReview;
