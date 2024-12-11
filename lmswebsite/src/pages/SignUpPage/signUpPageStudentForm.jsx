// src/components/SignUpPage/StudentForm.jsx

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
import { LinkText, ButtonContainer } from "./SignUpPage.style";

const { Option } = Select;
const { Title } = Typography;

const StudentForm = ({ boards, navigate }) => {
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
      navigate("/login");
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
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ student_email: "" }}
      onValuesChange={(changedValues, allValues) => {
        if (changedValues.email) {
          form.setFieldsValue({ student_email: changedValues.email });
        }
      }}
    >
      {/* Common Fields */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please enter your email address" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Email Address" />
          </Form.Item>
        </Col>
        <Form.Item
          name="student_name"
          label="Student Name"
          rules={[
            { required: true, message: "Please enter your name" },
            { max: 50, message: "Name cannot exceed 50 characters" },
          ]}
        >
          <Input placeholder="Student Name" />
        </Form.Item>
      </Row>
      <Row guttter={16}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
          <Form.Item
            name="studentDOB"
            label="Date of Birth"
            rules={[
              { required: true, message: "Please enter your date of birth" },
            ]}
          >
            <Input type="date" placeholder="Date of Birth" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Please enter your password" },
          { min: 6, message: "Password must be at least 6 characters" },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      {/* Student Specific Fields */}
      <Form.Item
        name="profile_image"
        label="Upload Profile Image"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e;
          }
          return e && e.fileList;
        }}
        rules={[
          { required: true, message: "Please upload your profile image" },
        ]}
      >
        <Upload
          name="profileImage"
          listType="picture"
          beforeUpload={() => false} // Prevent automatic upload
          accept=".jpg,.jpeg,.png"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>
            Click to Upload Profile Image
          </Button>
        </Upload>
      </Form.Item>

      {/* Student Email (Read-Only and Same as Main Email) */}

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

      <ButtonContainer>
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
      </ButtonContainer>

      <p>
        Already have an Account? <LinkText href="/login">Log in</LinkText>
      </p>
    </Form>
  );
};

export default StudentForm;
