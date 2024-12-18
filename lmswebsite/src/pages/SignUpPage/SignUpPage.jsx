import React, { useState, useEffect } from "react";
import "./SignUpPage.css";
import { message, Radio, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import SignUpImage from "../../assets/SignUpImage.png"; // Replace with your image path

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
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch saved data from previous pages
    const board = JSON.parse(localStorage.getItem("selectedBoard")) || {};
    const classData = JSON.parse(localStorage.getItem("selectedClass")) || {};
    const subject = JSON.parse(localStorage.getItem("selectedSubject")) || "";

    setFormData((prev) => ({
      ...prev,
      board: board.name || "Not Selected",
      className: classData.className || "Not Selected",
      subject: subject || "Not Selected",
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add API integration logic here
    message.success("Registration Successful!");
    navigate("/login");
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
