import React from "react";
import { Button, Input, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import ContactImage from "../../assets/ContactUsImage.png";
import {
  ContactUsWarp,
  ContactContainer,
  ContactForm,
  ContactImageContainer,
  Image,
} from "./ContactUs.Styles";
import HeaderSection from "../NavBar/navbar";
import Footer from "../Footer/Footer";
import { createQuery } from "../../../api/customerQueryApi"; // Ensure the API function path is correct

const ContactUs = () => {
  const [form] = Form.useForm(); // Ant Design Form instance

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      // Call the API to create the query
      const response = await createQuery(values);

      if (response) {
        console.log("Query successfully submitted:", response);
        alert("Query submitted successfully!");
        form.resetFields(); // Reset form fields after successful submission
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      alert("Failed to submit query. Please try again.");
    }
  };

  return (
    <>
      <HeaderSection />
      <ContactUsWarp>
        <ContactContainer>
          <ContactForm>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              {/* Title Input */}
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter the title" }]}
              >
                <Input placeholder="Enter the Title" />
              </Form.Item>

              {/* Email Input */}
              <Form.Item
                name="email"
                label="Contact Email"
                rules={[
                  { required: true, message: "Please enter the email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter the Email" />
              </Form.Item>

              {/* Contact Number Input */}
              <Form.Item
                name="number"
                label="Contact Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter the contact number",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Contact number must be 10 digits",
                  },
                ]}
              >
                <Input
                  type="tel"
                  placeholder="Enter the Number"
                  maxLength={10}
                />
              </Form.Item>

              {/* Message Input */}
              <Form.Item
                name="message"
                label="Message"
                rules={[
                  { required: true, message: "Please enter the message" },
                ]}
              >
                <TextArea placeholder="Enter the Message" />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="ContactButton"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </ContactForm>
        </ContactContainer>

        {/* Contact Image */}
        <ContactImageContainer>
          <Image src={ContactImage} alt="Contact Us" />
        </ContactImageContainer>
      </ContactUsWarp>
      <Footer />
    </>
  );
};

export default ContactUs;
