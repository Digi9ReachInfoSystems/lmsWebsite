import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  message,
  Row,
  Col,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getClassesByBoardId } from "../../api/classApi";
import { uploadFileToFirebase } from "../../utils/uploadFileToFirebase";
import { signupUser } from "../../api/authApi";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { LinkText } from "./SignUpPage.style";

const { Option } = Select;
const { Title } = Typography;

const TeacherForm = ({ boards, navigate }) => {
  const [classes, setClasses] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

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
    setIsSubmitting(true);
    try {
      const {
        email,
        password,
        first_name,
        last_name,
        board_id,
        class_id,
        profile_picture,
      } = values;

      // Handle Firebase signup
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem(
        "sessionData",
        JSON.stringify({
          accessToken: user.accessToken,
          refreshToken: userCredential._tokenResponse.refreshToken,
        })
      );

      // If there's a profile picture, upload it
      if (profile_picture) {
        const profilePicUrl = await uploadFileToFirebase(profile_picture);
        console.log("Profile Picture URL:", profilePicUrl);
      }

      // Send email verification
      await sendEmailVerification(user);

      // You can send other user details (like first_name, last_name, etc.) to your backend for storage
      await signupUser({
        first_name,
        last_name,
        email,
        board_id,
        class_id,
        profile_picture: profile_picture ? profile_picture.name : "",
      });

      message.success(
        "Account created successfully. Please verify your email."
      );
      navigate("/login");
    } catch (error) {
      message.error(error.message || "Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="teacher-form-container">
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ board_id: "", class_id: "" }}
      >
        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input a valid email address!",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        {/* Board Selection */}

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            style={{
              backgroundColor: "#ff4d88", // Pink color for button
              borderColor: "#ff4d88",
              color: "white",
              width: "27vw",
            }}
          >
            {isSubmitting ? "Submitting..." : "Create Account"}
          </Button>
        </Form.Item>

        {/* Link to Login */}
        <LinkText>
          Already have an account? <a href="/login">Login here</a>
        </LinkText>
      </Form>
    </div>
  );
};

export default TeacherForm;
