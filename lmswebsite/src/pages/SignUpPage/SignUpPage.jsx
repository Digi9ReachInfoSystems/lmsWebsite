// sign up and pay page

import React, { useState, useEffect } from "react";
import "./SignUpPage.css";
import { message, Radio, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import SignUpImage from "../../assets/4966434.jpg"; // Replace with your image path
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { uploadFileToFirebase } from "../../utils/uploadFileToFirebase";
import { signupUser } from "../../api/authApi";
import { getUserByAuthId } from "../../api/userApi";
import {
  studentAccountCreated,
  studentSignedUpAdmin,
} from "../../api/mailNotificationApi";
import moment from "moment";
import { set } from "lodash";

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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch saved data from previous pages
    const board = JSON.parse(localStorage.getItem("selectedBoard"))._id || {};
    const classData =
      JSON.parse(localStorage.getItem("selectedClass"))._id || {};
    const subject = JSON.parse(localStorage.getItem("selectedSubjects")) || "";
    const duration =
      JSON.parse(localStorage.getItem("selectedDuration")).duration || {};
    const amount = JSON.parse(localStorage.getItem("totalAmount")) || 0;
    const type_of_batch =
      JSON.parse(localStorage.getItem("selectedBatch"))._id || "";

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

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate("/selectDuration");
    };

    // Add event listener for back navigation
    window.addEventListener("popstate", handleBackButton);

    return () => {
      // Cleanup listener on component unmount
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Form Submitted:", formData);
    // Add API integration logic here
    setLoading(true);
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
      const gstAmount = JSON.parse(localStorage.getItem("taxes"));
      // const profileImageUrl = await uploadFileToFirebase(
      //   formData.profileImage,
      //   "studentProfile"
      // );
      //console.log("Profile Image URL:", profileImageUrl);
      // Prepare data to send to API
      const data = {
        role: "student",
        access_token: user.accessToken,
        refresh_token: userCredential._tokenResponse.refreshToken,
        class_id: formData.className,
        // profile_image: profileImageUrl,
        phone_number: formData.phoneNumber,
        student_name: formData.name,
        studentGender: formData.gender,
        studentDOB: formData.dob,
        board_id: formData.board,
        amount: formData.amount,
        duration: formData.duration,
        type_of_batch: formData.type_of_batch,
        subject_id: {
          _id: formData.subject,
          type_of_batch: formData.type_of_batch,
          duration: formData.duration,
        },
        gstAmount: gstAmount,
        discountAmount: 0,
      };
      //console.log(data);
      await signupUser(data);
      await studentAccountCreated(
        formData.name,
        formData.email,
        formData.password
      );
      await studentSignedUpAdmin(formData.name, formData.email);
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
    } catch (error) {
      console.error("Registration error:", error);

      // Check for specific Firebase error codes
      let errorMessage = "Registration failed. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already registered. Please sign in or use a different email.";
      } else if(error.code === "auth/weak-password") {
        errorMessage =
          "Password must be at least 6 characters long.";
      }
       else if (error.code) {
        // Optional: Handle other specific error codes if needed
        errorMessage = error.message || errorMessage;
      }

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
    // navigate("/login");
  };

  return (
    <div className="signup-container">
      {/* Left Section - Image */}
      {/* <div className="image-section">
        <img src={SignUpImage} alt="Registration" className="imagesignup" />
        <h2>Register To The Platform</h2>
        <p>Your Journey Begins Here</p>
      </div> */}

      {/* Right Section - Form */}
      <div className="form-section">
        <p className="form-subheading">Create Your Account to Continue</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
  <label>Full Name</label>
  <input
    type="text"
    name="name"
    placeholder="Enter your name"
    onKeyPress={(e) => {
      const char = String.fromCharCode(e.which || e.keyCode);
      const alphabetOnly = /^[A-Za-z\s]+$/;
      if (!alphabetOnly.test(char)) {
        e.preventDefault(); // Prevent invalid characters from being entered
      }
    }}
    onChange={(e) => {
      const value = e.target.value;
      const alphabetOnly = /^[A-Za-z\s]*$/;
      if (alphabetOnly.test(value)) {
        handleInputChange(e); // Update the state with valid input
      }
    }}
    required
  />
</div>


<div className="form-group">
  <label>Email</label>
  <input
    type="email"
    name="email"
    placeholder="Enter your email"
    onChange={(e) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const value = e.target.value;
      if (emailRegex.test(value)) {
        handleInputChange(e); // Update state only if email is valid
      } else if (value === "") {
        setFormData((prev) => ({ ...prev, email: "" })); // Clear invalid email
      }
    }}
    required
  />
</div>

<div className="form-group">
  <label>Phone Number</label>
  <input
    type="text"
    name="phoneNumber"
    placeholder="Enter phone number"
    maxLength={10} // Limit input length to 10 characters
    onKeyPress={(e) => {
      const char = String.fromCharCode(e.which || e.keyCode);
      if (!/^\d$/.test(char)) {
        e.preventDefault(); // Prevent non-numeric input
      }
    }}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
      if (value.length <= 10) {
        handleInputChange({ target: { name: "phoneNumber", value } }); // Update state
      }
    }}
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
              disabledDate={(current) => {
                // Disable dates after today
                return current && current.isAfter(moment().endOf("day"), "day");
              }}
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
          {/* <div className="form-group">
            <label>Profile Image</label>
            <input type="file" onChange={handleFileUpload} required />
          </div> */}

          <div className="form-actions">
            <button type="submit" className="confirm-btn" onLoad={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
