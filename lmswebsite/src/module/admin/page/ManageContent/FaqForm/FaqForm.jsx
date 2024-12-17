import React, { useState } from "react";
import { Form, Input, Alert, Spin, message } from "antd"; // Ant Design components
import { FormContainer, StyledButton } from "./FaqForm.style"; // Import styles
import { createFAQ } from "../../../../../api/faq"; // Adjust the path to your API function
import Animation from "../../../../admin/assets/Animation.json";
import Lottie from "lottie-react";
 
const FaqForm = () => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const  [loading, setLoading] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null); // Clear any existing errors
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
 
    try {
      setLoading(true);
      if (!formData.question || !formData.answer) {
        setError("Both question and answer are required.");
        setIsSubmitting(false);
        return;
      }
 
      // Call the API function to create the FAQ
      await createFAQ(formData);
      message.success("FAQ created successfully!");
 
      // Clear form after successful submission
      setFormData({
        question: "",
        answer: "",
      });
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Failed to create FAQ. Please try again later."
      );
      console.error("Error creating FAQ:", error.response?.data || error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
      window.location.reload();
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
      <h2>Create FAQ</h2>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: "1em" }}
        />
      )}
      <Form onSubmitCapture={handleSubmit} layout="vertical">
        <Form.Item label="Question" required>
          <Input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter the FAQ question"
          />
        </Form.Item>
        <Form.Item label="Answer" required>
          <Input.TextArea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            placeholder="Enter the FAQ answer"
            rows={4}
          />
        </Form.Item>
        <Form.Item>
          <StyledButton
            type="primary"
            htmlType="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spin /> : "Submit"}
          </StyledButton>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};
 
export default FaqForm;
 