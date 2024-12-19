// src/components/admin/BlogForm/BlogForm.jsx

import React, { useState } from "react";
import { Form, Input, Select, Button, Upload, Alert, message } from "antd";
import { PlusOutlined, UploadOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { FormContainer } from "./BlogForm.style"; // Ensure you have this styled component
import { createBlog } from "../../../../../api/blogApi"; // Adjust the path accordingly
import { uploadFileToFirebase } from "../../../../../utils/uploadFileToFirebase"; // Ensure this function is correctly implemented
import Lottie from "lottie-react";
import Animation from "../../../../admin/assets/Animation.json"; // Your Lottie animation JSON

const { Option } = Select;
const { TextArea } = Input;

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: null, // Holds the file object
    imagePreview: "", // Holds the file name for display
    description: "",
    author: "",
    tags: [""], // Initialize with one empty tag
    status: "draft", // Default status
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null); // Clear any existing errors
  };

  // Handle changes for Select components (e.g., status)
  const handleSelectChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    setError(null); // Clear any existing errors
  };

  // Handle file selection
  const handleFileChange = (file) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: file, // Store the file object
        imagePreview: file.name, // Use the file name for display
      }));
      setError(null); // Clear error
    } else {
      setFormData((prev) => ({
        ...prev,
        imageUrl: null,
        imagePreview: "",
      }));
      setError("Please select a valid file.");
    }
    return false; // Prevent automatic upload by Ant Design
  };

  // Handle tag input changes
  const handleTagChange = (index, value) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData((prev) => ({
      ...prev,
      tags: newTags,
    }));
  };

  // Add a new tag input field
  const addTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, ""],
    }));
  };

  // Remove a tag input field
  const removeTag = (index) => {
    const newTags = [...formData.tags];
    newTags.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      tags: newTags.length > 0 ? newTags : [""], // Ensure at least one tag input remains
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");

    try {
      setLoading(true);
      const { title, imageUrl, description, author, tags, status } = formData;

      // Validate required fields
      if (!title || !imageUrl || !description || !author) {
        setError("Please fill out all required fields and upload an image.");
        setIsSubmitting(false);
        setLoading(false);
        return;
      }

      // Filter out empty tags
      const filteredTags = tags.map(tag => tag.trim()).filter(tag => tag !== "");

      // Optional: Validate tags (e.g., no duplicates)
      const uniqueTags = [...new Set(filteredTags)];
      if (uniqueTags.length !== filteredTags.length) {
        setError("Duplicate tags are not allowed.");
        setIsSubmitting(false);
        setLoading(false);
        return;
      }

      // Upload the image to Firebase and get the URL
      const uploadedImageUrl = await uploadFileToFirebase(imageUrl);

      // Create the blog post via API
      const response = await createBlog({
        title,
        image: uploadedImageUrl, // Use the uploaded image URL from Firebase
        description,
        author,
        tags: uniqueTags,
        status,
      });

      setSuccessMessage("Blog post created successfully!");
      // Clear form data
      setFormData({
        title: "",
        imageUrl: null,
        imagePreview: "",
        description: "",
        author: "",
        tags: [""],
        status: "draft",
      });
    } catch (err) {
      console.error("Error creating blog post:", err);
      setError(
        "Error creating blog post: " +
          (err.response?.data?.error || err.message)
      );
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  // Loading Animation
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
            transform: "scale(0.5)", // Scale down the animation
            transformOrigin: "center center",
          }}
        >
          <Lottie animationData={Animation} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <FormContainer>
      <h2>Create Blog Post</h2>

      <Form onFinish={handleSubmit} layout="vertical">
        {/* Title Field */}
        <Form.Item label="Title" required>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter blog title"
          />
        </Form.Item>

        {/* Description Field */}
        <Form.Item label="Description" required>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Enter blog description"
          />
        </Form.Item>

        {/* Author Field */}
        <Form.Item label="Author" required>
          <Input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Enter author's name"
          />
        </Form.Item>

        {/* Tags Field */}
        <Form.Item label="Tags">
          {formData.tags.map((tag, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <Input
                type="text"
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                placeholder={`Tag ${index + 1}`}
                required
                style={{ flex: 1, marginRight: "8px" }}
              />
              {formData.tags.length > 1 && (
                <Button
                  type="danger"
                  icon={<MinusCircleOutlined />}
                  onClick={() => removeTag(index)}
                  style={{ marginRight: "4px" }}
                />
              )}
              {index === formData.tags.length - 1 && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={addTag}
                />
              )}
            </div>
          ))}
          {/* Optionally, you can provide a submit button here or handle it globally */}
        </Form.Item>

        {/* Status Field */}
        <Form.Item label="Status" required>
          <Select
            value={formData.status}
            onChange={(value) => handleSelectChange(value, "status")}
          >
            <Option value="draft">Draft</Option>
            <Option value="published">Published</Option>
          </Select>
        </Form.Item>

        {/* Image Upload Field */}
        <Form.Item label="Upload Image" required>
          <Upload
            beforeUpload={handleFileChange}
            showUploadList={false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {/* Display the selected image name */}
          {formData.imagePreview && (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <p>{formData.imagePreview}</p>
            </div>
          )}
        </Form.Item>

        {/* Error message */}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: "10px" }}
          />
        )}

        {/* Success message */}
        {successMessage && (
          <Alert
            message={successMessage}
            type="success"
            showIcon
            style={{ marginBottom: "10px" }}
          />
        )}

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            style={{ margin: "0 auto", display: "block" }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default BlogForm;
