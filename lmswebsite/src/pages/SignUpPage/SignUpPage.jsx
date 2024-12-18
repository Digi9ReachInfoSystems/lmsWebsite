import React, { useState, useEffect } from "react";
import "./SignUpPage.css";
import { message, Radio, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import SignUpImage from "../../assets/SignUpImage.png"; // Replace with your image path
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { uploadFileToFirebase } from "../../utils/uploadFileToFirebase";
import { signupUser } from "../../api/authApi";
import { getUserByAuthId } from "../../api/userApi";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    board: "",
    className: "",
    subject: "",
    phoneNumber: "",
    email: "",
    name: "",
    dob: "",
    password: "",
    gender: "",
    profileImage: null,
    duration: "",
    amount: "",
    type_of_batch: "",

  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch saved data from previous pages
    const board = JSON.parse(localStorage.getItem("selectedBoard"))._id || {};
    const classData = JSON.parse(localStorage.getItem("selectedClass"))._id || {};
    const subject = JSON.parse(localStorage.getItem("selectedSubjects")) || "";
    const duration = JSON.parse(localStorage.getItem("selectedDuration")).title || {};
    const amount = JSON.parse(localStorage.getItem("totalAmount")) || 0;
    const type_of_batch = JSON.parse(localStorage.getItem("selectedBatch"))._id || "";

    setFormData((prev) => ({
      ...prev,
      board: board || "Not Selected",
      className: classData || "Not Selected",
      subject: subject || "Not Selected",
      duration: duration || "0 Months",
      amount: amount || 0,
      type_of_batch: type_of_batch || "",
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add API integration logic here
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      localStorage.setItem(
        "sessionData",
        JSON.stringify({
          accessToken: user.accessToken,
          refreshToken: userCredential._tokenResponse.refreshToken,
        })
      );
      const profileImageUrl = await uploadFileToFirebase(
        formData.profileImage,
        "studentProfile"
      );
      console.log("Profile Image URL:", profileImageUrl);
      // Prepare data to send to API
      const data = {
        role: "student",
        access_token: user.accessToken,
        refresh_token: userCredential._tokenResponse.refreshToken,
        class_id: formData.className,
        profile_image: profileImageUrl,
        phone_number: formData.phoneNumber,
        student_name: formData.name,
        studentGender: formData.gender,
        studentDOB: formData.dob,
        board_id: formData.board,
        amount: formData.amount,
        duration: formData.duration,
        type_of_batch: formData.type_of_batch,
      };
      console.log(data);
      await signupUser(data);

    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.message || "Registration failed. Please try again.";
      message.error(`Registration failed: ${errorMessage}`);
    }
    message.success("Registration Successful!");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const { user } = userCredential;
      localStorage.setItem(
        "sessionData",
        JSON.stringify({ accessToken: user.accessToken })
      );
      const profileData = await getUserByAuthId(user.uid);
      const sessionData = {
        userId: user.uid,
        accessToken: user.accessToken,
        refreshToken: profileData.user.refresh_token,
        name: profileData.user.name,
        loggedIn: "true",
      };
      localStorage.setItem("sessionData", JSON.stringify(sessionData));
      navigate("/paymentScreen");

    } catch (error) {
      console.error(error.message);
    }
    // navigate("/login");
  };

  return (
    <div className="signup-container">
      {/* Left Section - Image */}
      <div className="image-section">
        <img src={SignUpImage} alt="Registration" />
        <h2>Register To The Platform</h2>
        <p>Your Journey Begins Here</p>
      </div>

      {/* Right Section - Form */}
      <div className="form-section">
        {/* <h2 className="form-heading">Registration</h2> */}
        <p className="form-subheading">Enter Your Details</p>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* Static Fields */}

          {/* Editable Fields */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter phone number"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <DatePicker
              onChange={(date, dateString) =>
                setFormData({ ...formData, dob: dateString })
              }
              style={{ width: "100%" }}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <Radio.Group
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Profile Image</label>
            <input type="file" onChange={handleFileUpload} required />
          </div>

          <div className="form-actions">
            <button type="submit" className="confirm-btn">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
