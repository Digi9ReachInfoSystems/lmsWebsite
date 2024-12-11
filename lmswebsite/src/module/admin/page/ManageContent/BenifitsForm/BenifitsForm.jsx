import React, { useState } from "react";
import { Form, Input, Button, Alert, message, Spin } from "antd"; // Ant Design components
import { FormContainer } from "./BenifitsForm.styles"; // Import updated styles
import { createBenefit } from "../../../../../api/benefitsApi"; // Adjust path to your API function
import Animation from "../../../../admin/assets/Animation.json";
import Lottie from "lottie-react";
 
const BenefitForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");
 
    if (!formData.title || !formData.description || !formData.color) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }
 
    try {
      setLoading(true);
      await createBenefit(formData); // Call API
      setSuccessMessage("Benefit created successfully!");
      message.success("Benefit created successfully!");
      setFormData({
        title: "",
        description: "",
        color: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create benefit");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
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

  return (
    <FormContainer>
      <h2>Create Benefit</h2>
      {error && <Alert message={error} type="error" showIcon />}
      {successMessage && <Alert message={successMessage} type="success" showIcon />}
      <Form onSubmitCapture={handleSubmit} layout="vertical">
        <Form.Item label="Title" required>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the title"
          />
        </Form.Item>
        <Form.Item label="Description" required>
          <Input.TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter the description"
            rows={4}
          />
        </Form.Item>
        <Form.Item label="Color" required>
          <Input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            style={{ margin: "0 auto", display: "block" }}
          >
            {isSubmitting ? <Spin /> : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};
 
export default BenefitForm;