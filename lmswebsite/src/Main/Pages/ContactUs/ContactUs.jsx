import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import ContactImage from "../../assets/ContactUsImage.png";
import {
  ContactUsWarp,
  ContactContainer,
  ContactForm,
  ContactImageContainer,
  Image,
  ContactInfo,
  ContactItem,
} from "./ContactUs.Styles";
import HeaderSection from "../NavBar/navbar";
import Footer from "../Footer/Footer";
import { createQuery } from "../../../api/customerQueryApi"; // Ensure the API function path is correct
import { FiMessageSquare, FiPhoneCall } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa6";
import { LiaFacebookMessenger } from "react-icons/lia";
import { IoInformationCircleOutline } from "react-icons/io5";

const ContactUs = () => {
  const contactItems = [
    {
      id: "info",
      label: "Roy Career Solutions",
      Link: "https://roycareersolutions.com/",
      // detail: "XYZ",
      icon: IoInformationCircleOutline,
    },
    // {
    //   id: "text",
    //   label: "Text us",
    //   detail: "310-803-5878",
    //   icon: FiMessageSquare,
    // },
    // { id: "call", label: "Call us", detail: "866-765-2327", icon: FiPhoneCall },
    {
      id: "message",
      label: "Message us",
      detail: "Facebook Message",
      Link: "https://www.facebook.com/people/The-Topper-Academy/61567845897039/",
      icon: LiaFacebookMessenger,
    },
    {
      id: "email",
      label: "Email us",
      detail: "info@thetopperacademy.com",
      icon: FaRegEnvelope,
    },
  ];

  const [form] = Form.useForm(); // Ant Design Form instance

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const submissionData = {
        title: values.title,
        contactEmail: values.email,
        contactNumber: values.number,
        message: values.message,
      };
      // Call the API to create the query
      const response = await createQuery(submissionData);

      if (response) {
        //console.log("Query successfully submitted:", response);
        alert("Query submitted successfully!");
        form.resetFields(); // Reset form fields after successful submission
      }
    } catch (error) {
      //console.error("Error submitting query:", error);
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
                <Button htmlType="submit" className="ContactButton">
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

      <ContactInfo>
        {contactItems.map(({ id, label, detail, icon: Icon, Link }) => (
          <ContactItem key={id}>
            <a href={Link} target="_blank" rel="noopener noreferrer">
              <Icon className="contact-icon" title={label} />
            </a>
            <p>
              {label}
              <br />
              <strong>{detail}</strong>
            </p>
          </ContactItem>
        ))}
      </ContactInfo>

      <Footer />
    </>
  );
};

export default ContactUs;
