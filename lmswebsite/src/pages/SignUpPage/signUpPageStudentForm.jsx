// src/components/SignUpPage/StudentForm.jsx

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  message,
  Typography,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getClassesByBoardId } from "../../api/classApi";
import { uploadFileToFirebase } from "../../utils/uploadFileToFirebase";
import { signupUser } from "../../api/authApi";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { LinkText, ButtonContainer } from "./SignUpPage.style";
import { use } from "react";
import { getBoards } from "../../api/boardApi";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import SignUpImage from "../../assets/Logofinal.png";
import { getUserByAuthId } from "../../api/userApi";

const { Option } = Select;
const { Title, Text } = Typography;

const StudentForm = () => {
  const [classes, setClasses] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getBoards();
      console.log(response);

      setBoards(response);
    };
    apiCaller();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      if (selectedBoard) {
        try {
          const classData = await getClassesByBoardId(selectedBoard);
          console.log("Fetched Classes:", classData);
          setClasses(classData || []);
        } catch (error) {
          console.error("Error fetching classes:", error);
          message.error("Failed to load classes. Please try again later.");
        }
      } else {
        setClasses([]);
      }
    };

    fetchClasses();
  }, [selectedBoard]);

  const handleBoardChange = (value) => {
    setSelectedBoard(value);
    form.setFieldsValue({ class_id: undefined }); // Reset class selection
  };

  const handleSubmit = async (values) => {
    console.log("Student Form Values:", values);
    setIsSubmitting(true);
    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      localStorage.setItem(
        "sessionData",
        JSON.stringify({
          accessToken: user.accessToken,
          refreshToken: userCredential._tokenResponse.refreshToken,
        })
      );

      // Upload profile image
      let profileImageUrl = "";
      if (values.profile_image && values.profile_image.length > 0) {
        profileImageUrl = await uploadFileToFirebase(
          values.profile_image[0].originFileObj,
          "studentProfile"
        );
      }

      // Prepare data to send to API
      const data = {
        role: "student",
        access_token: user.accessToken,
        refresh_token: userCredential._tokenResponse.refreshToken,
        class_id: values.class_id,
        profile_image: profileImageUrl,
        phone_number: values.phone_number,
        student_name: values.student_name,
        studentGender: values.studentGender,
        studentDOB: values.studentDOB,
        board_id: values.board_id,
      };

      console.log("Submitting Student Data:", data);
      await signupUser(data);

      // Clear local storage and navigate to login
      localStorage.clear();
      message.success("Registration successful! Please verify your email.");
      message.success("Registration Successful!");
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
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
          role: profileData.user.role,
        };
        localStorage.setItem("sessionData", JSON.stringify(sessionData));
        navigate("/student");
      } catch (error) {
        console.error(error.message);
      }
      // navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.message || "Registration failed. Please try again.";
      message.error(`Registration failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        "@media(max-width:768px)": { flexDirection: "column" },
      }}
    >
      {/* Left Section for Logo */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9f9f9",
          "@media(max-width:768px)": { display: "none!important" },
        }}
      >
        <img src={SignUpImage} alt="Logo" />
      </div>

      {/* Right Section for Form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ width: "100%", maxWidth: "600px" }}>
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            Sign up
          </Title>
          <Text
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: "20px",
              color: "#888",
            }}
          >
            Sign up to continue
          </Text>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ student_email: "" }}
          >
            <Form.Item
              name="student_name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="phone_number"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
                {
                  pattern: /^\d{10}$/,
                  message: "Phone number must be 10 digits",
                },
              ]}
            >
              <Input placeholder="Phone Number" maxLength={10} />
            </Form.Item>

            <Form.Item
              name="board_id"
              label="Select Board"
              rules={[{ required: true, message: "Please select a board" }]}
            >
              <Select
                placeholder="Select Board"
                onChange={handleBoardChange}
                allowClear
              >
                {boards.map((b) => (
                  <Option key={b._id} value={b._id}>
                    {b.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="class_id"
              label="Select Class"
              rules={[
                { required: true, message: "Please select at least one class" },
              ]}
            >
              <Select placeholder="Select Class" allowClear>
                {classes.map((cls) => (
                  <Option key={cls._id} value={cls._id}>
                    {cls.classLevel} - {cls.className}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="studentGender"
              label="Select Gender"
              rules={[{ required: true, message: "Please select your gender" }]}
            >
              <Select placeholder="Select Gender" allowClear>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                style={{
                  width: "100%",
                  backgroundColor: "purple",
                  borderColor: "purple",
                  color: "#fff",
                  height: "40px",
                }}
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>

          <Text
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "10px",
              color: "#888",
            }}
          >
            Already have an account?{" "}
            <a
              href="/"
              style={{
                color: "purple",
                "&:hover": { textDecoration: "underline!important" },
              }}
            >
              Sign in
            </a>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
