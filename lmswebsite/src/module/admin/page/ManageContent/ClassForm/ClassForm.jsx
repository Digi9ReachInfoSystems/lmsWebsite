import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, message, Spin, Alert, Upload } from "antd";
import { createClass } from "../../../../../api/classApi";
import { getBoards } from "../../../../../api/boadApi";
import { UploadOutlined } from "@ant-design/icons";
import Animation from "../../../../admin/assets/Animation.json";
import Lottie from "lottie-react";

const { Option } = Select;

const ClassForm = () => {
  const [form] = Form.useForm(); // Form instance
  const [boards, setBoards] = useState([]); // Board data
  const [loadingBoard, setLoadingBoard] = useState(false); // Loading state for boards
  const [boardError, setBoardError] = useState(null); // Error state for boards
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission loading state
  const [imageFile, setImageFile] = useState(null); // To hold uploaded image file
  const [loading, setLoading] = useState(false); // Overall loading state

  // Fetch boards when component mounts
  useEffect(() => {
    const fetchBoards = async () => {
      setLoadingBoard(true);
      try {
        const fetchedBoards = await getBoards();
        setBoards(fetchedBoards);
      } catch (error) {
        setBoardError("Failed to fetch boards. Please try again.");
      } finally {
        setLoadingBoard(false);
      }
    };
    fetchBoards();
  }, []);

  // Handle image upload
  const handleImageChange = ({ file }) => {
    setImageFile(file); // Save the file in state
  };

  // Handle form submission
  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      const submissionData = { ...values, imageLink: imageFile };
      await createClass(submissionData);
      message.success("Class created successfully!");
      form.resetFields();
      setImageFile(null); // Reset image file
    } catch (error) {
      let errorMsg = "Failed to create class. Please try again.";
      if (error.response?.data?.error) {
        errorMsg = error.response.data.error;
      }
      message.error(errorMsg);
    } finally {
      setIsSubmitting(false);
      window.location.reload();
    }
  };

  // Show loading animation when loading
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
            transform: "scale(0.5)",
            transformOrigin: "center center",
          }}
        >
          <Lottie animationData={Animation} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="class-form-container"
      style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}
    >
      <h2>Create Class</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          className: "",
          classLevel: "",
          curriculum: "",
          description: "",
        }}
      >
        {/* Class Name */}
        <Form.Item
          label="Class Name"
          name="className"
          rules={[{ required: true, message: "Please enter the class name!" }]}
        >
          <Input placeholder="Enter class name" />
        </Form.Item>

        {/* Class Level */}
        <Form.Item
          label="Class Level"
          name="classLevel"
          rules={[
            { required: true, message: "Please enter the class level!" },
            {
              pattern: /^[1-9]\d*$/,
              message: "Class level must be a positive number greater than 0",
            },
          ]}
        >
          <Input placeholder="Enter class level (e.g., 5th, 6th, etc.)" />
        </Form.Item>

        {/* Board Selection */}
        <Form.Item
          label="Board"
          name="curriculum"
          rules={[{ required: true, message: "Please select a board!" }]}
        >
          {loadingBoard ? (
            <Spin tip="Loading boards..." />
          ) : boardError ? (
            <Alert message={boardError} type="error" showIcon />
          ) : (
            <Select placeholder="Select Board">
              {boards.map((board) => (
                <Option key={board._id} value={board._id}>
                  {board.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please add a description!" }]}
        >
          <Input.TextArea placeholder="Enter class description" rows={4} />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          label="Class Image"
          name="imageLink"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload
            beforeUpload={() => false} // Prevent auto-upload
            maxCount={1}
            onChange={handleImageChange}
            accept="image/*"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            style={{
              backgroundColor: "#EE1B7A",
              display: "block",
              width: "auto",
              margin: "0 auto",
            }}
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            block
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ClassForm;
