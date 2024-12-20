import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TeacherApplicationFormReviewWrap } from "./TeacherApplicationFormreview.styles";
import {
  getSingleTeacherApplication,
  approveTeacherApplication,
} from "../../../../api/teachersApplicationApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Animation from "../../../admin/assets/Animation.json";
import Lottie from "lottie-react";
import {
  Table,
  Input,
  Button,
  Select,
  Modal,
  Form,
  Upload,
  message,
  DatePicker,
} from "antd";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../../../config/firebaseConfig";
import { signupUser } from "../../../../api/authApi";

const TeacherApplicationFormReview = ({ teacher_Id, closeModal }) => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [teacher_name, setTeacherName] = useState('');
  const [form] = Form.useForm(); // Ant Design form instance
  const [isResumeModalVisible, setIsResumeModalVisible] = useState(false); // State for Resume Modal

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const data = await getSingleTeacherApplication(teacher_Id);
        if (!data) {
          throw new Error("Teacher not found");
        }
        setTeacher(data);
        setTeacherName(data.application?.teacher_name);
        console.log("Fetched Teacher Data:", data); // Debugging line
      } catch (err) {
        console.error("Error fetching teacher:", err);
        setError("Failed to fetch teacher details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherDetails();
  }, [teacher_Id]);

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

  const handleonFinish = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      const oldSessionData = JSON.parse(localStorage.getItem("sessionData"));
      localStorage.setItem(
        "sessionData",
        JSON.stringify({
          accessToken: user.accessToken,
          refreshToken: userCredential._tokenResponse.refreshToken,
        })
      );
      console.log("user", values);
      const userData = await signupUser({
        role: "teacher",
        student_name: teacher_name,
        email: values.email,
        access_token: user.accessToken,
        refresh_token: userCredential._tokenResponse.refreshToken,
      });
      await approveTeacherApplication(teacher_Id, {
        microsoft_id: values.microsoft_id,
        microsoft_password: values.password,
        microsoft_principle_name: values.email,
        auth_id: user.uid,
        user_id: userData.user._id,
      });
      localStorage.setItem(
        "sessionData",
        JSON.stringify(oldSessionData)
      );
      console.log("Form Values:", values);
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

  const handleViewResume = () => {
    // Attempt to access resume_Link with different possible cases
    const resumeLink =
      teacher?.application?.resume_Link ||
      teacher?.application?.resume_link ||
      teacher?.application?.resumeURL ||
      null;

    if (resumeLink) {
      setIsResumeModalVisible(true);
    } else {
      toast.error("No resume found.");
    }
  };

  const handleModalClose = () => {
    setIsResumeModalVisible(false);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "300px",
            height: "300px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // Scale down the animation using transform
            transform: "scale(0.5)",
            transformOrigin: "center center",
          }}
        >
          <Lottie
            animationData={Animation}
            loop={true}
          />
        </div>
      </div>
    );
  }

  if (error) return <p className="error_message">{error}</p>;

  return (
    <TeacherApplicationFormReviewWrap>
      <ToastContainer /> {/* Ensure ToastContainer is included */}
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
                {teacher?.application?.teacher_name || "N/A"}
              </p>
            </div>
            <div className="teacher-details-item">
              <p>Email</p>
              <p className="Values">
                {teacher?.application?.email || "N/A"}
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
                {teacher?.application.phoneNumber || "N/A"}
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
        
        {/* Display Resume Link for Verification */}
        <div style={{ marginTop: '20px' }}>
          <p>
            <strong>Resume Link:</strong>{" "}
            {teacher?.application?.resume_Link ||
            teacher?.application?.resume_link ||
            teacher?.application?.resumeURL ? (
              <a href={
                teacher.application.resume_Link ||
                teacher.application.resume_link ||
                teacher.application.resumeURL
              } target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            ) : (
              "No resume available."
            )}
          </p>
        </div>

        <Button
          type="primary"
          onClick={handleViewResume}
          className="view-resume-btn"
          style={{ marginBottom: '20px' }}
        >
          View Resume
        </Button>

        {/* Resume Modal */}
        <Modal
          title={`${teacher?.application?.teacher_name}'s Resume`}
          visible={isResumeModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
          width={800}
        >
          {teacher?.application?.resume_Link ||
          teacher?.application?.resume_link ||
          teacher?.application?.resumeURL ? (
            <iframe
              src={
                teacher.application.resume_Link ||
                teacher.application.resume_link ||
                teacher.application.resumeURL
              }
              title="Resume"
              width="100%"
              height="600px"
              style={{ border: "none" }}
              onError={(e) => {
                console.error("Error loading resume iframe:", e);
                message.error("Failed to load the resume. Please try again later.");
              }}
            ></iframe>
          ) : (
            <p>No resume available.</p>
          )}
        </Modal>

        <Form form={form} layout="vertical" onFinish={handleonFinish}>
          {/* Microsoft ID */}
          <Form.Item
            label="Microsoft ID"
            name="microsoft_id"
            rules={[
              { required: true, message: "Please enter the Microsoft ID" },
            ]}
          >
            <Input placeholder="Enter Microsoft ID" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter the password" },
              // You might want to add more complex password validation here
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={false}>
              Approve
            </Button>
          </Form.Item>
        </Form>

        {/* Optional Reject Button */}
        {/* <Button
          type="danger"
          onClick={handleReject}
          className="reject-btn"
          style={{ marginTop: '10px' }}
        >
          Reject
        </Button> */}
      </div>
    </TeacherApplicationFormReviewWrap>
  );
};

export default TeacherApplicationFormReview;
